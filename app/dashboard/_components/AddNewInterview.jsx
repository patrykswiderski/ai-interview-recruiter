'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { chatSession } from '../../../utils/GeminiAIModel.js'
import { LoaderCircle } from 'lucide-react'
import { AiRecruiterInterview } from '../../../utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../../../utils/db.js'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [jobExperience, setJobExperience] = useState()
  const [loading, setLoading] = useState(false)
  const [interviewQuestions, setInterviewQuestions] = useState([])
  const { user } = useUser()
  const router = useRouter()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of experience: ${jobExperience}, Depends on this information please give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview questions with Answered in JSON Format, Give Questions and Answered as filed in JSON`

    const result = await chatSession.sendMessage(InputPrompt)
    const AirJsonResponse = result.response
      .text()
      .replace('```json', '')
      .replace('```', '')

    console.log(JSON.parse(AirJsonResponse))

    setInterviewQuestions(AirJsonResponse)

    if (AirJsonResponse) {
      const resp = await db
        .insert(AiRecruiterInterview)
        .values({
          ariId: uuidv4(),
          jsonAriResp: AirJsonResponse,
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user,
          createdAt: moment().format('DD/MM/YYYY HH:mm'),
        })
        .returning({ airId: AiRecruiterInterview.ariId })

      console.log('insert ID:', resp)
      if (resp) {
        setOpenDialog(false)
        router.push(`/dashboard/interview/${resp[0]?.airId}`)
      }
    } else {
      console.log('AirJsonResponse is empty')
    }
    setLoading(false)
  }

  return (
    <div>
      <div
        className="p-10 rounded-lg bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl w-full">
              Tell us more about your experience with job interviewing?
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="font-semibold">
                    Please provide details about your job position or role, a
                    description of your responsibilities, and your years of
                    experience.
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job position or role</label>
                    <Input
                      placeholder="e.g. Software Engineer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>

                  <div className="mt-2 my-3">
                    <label>Job description or tech stack</label>
                    <Textarea
                      placeholder="e.g. React, Node, Python"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>

                  <div className="mt-2 my-3">
                    <label>Job years of experience</label>
                    <Input
                      placeholder="e.g. 3 max: 50 years "
                      type="number"
                      max="50"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel{' '}
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
