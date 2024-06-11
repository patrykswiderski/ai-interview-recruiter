'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [jobExperience, setJobExperience] = useState()

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('jobPosition:', jobPosition)
    console.log('jobDescription:', jobDescription)
    console.log('jobExperience:', jobExperience)
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
                  <Button type="submit">Start Interview</Button>
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
