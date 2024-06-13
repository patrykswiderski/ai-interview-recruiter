'use client'
import React, { useEffect, useState } from 'react'
import { AiRecruiterInterview } from '../../../../utils/schema'
import { db } from '../../../../utils/db'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(AiRecruiterInterview)
      .where(eq(AiRecruiterInterview.ariId, params.interviewId))

    setInterviewData(result[0])
  }

  return (
    <div className="my-6 flex flex-col justify-center items-center">
      <h2 className="font-bold text-2xl lg:text-3xl ">Let's start!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job position or role: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job description or tech stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Job years of experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>

          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 text-yellow-500">
            <h2 className="flex gap-2 items-center">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        <div className="">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 my-7 rounded-lg border bg-secondary" />
              <Button
                variant="ghost"
                className="w-full font-semibold text-neutral-500 border border-neutral-100"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center lg:justify-end items-end pt-5 lg:pt-2">
        <Button className="hover:scale-105 transition-all">
          Start Interview
        </Button>
      </div>
    </div>
  )
}

export default Interview
