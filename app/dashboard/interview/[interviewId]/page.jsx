'use client'
import React, { useEffect, useState } from 'react'
import { AiRecruiterInterview } from '../../../../utils/schema'
import { db } from '../../../../utils/db'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { WebcamIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails()
    console.log(interviewData)
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
      <h2 className="font-bold text-2xl">Let's get started</h2>
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
            <Button className="w-full" onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-col my-5">
        <h2 className="text-lg">
          <strong>Job position or role: </strong>
          {interviewData.jobPosition}
        </h2>
        <h2 className="text-lg">
          <strong>Job description or tech stack: </strong>
          {interviewData.jobDesc}
        </h2>
        <h2 className="text-lg">
          <strong>Job years of experience: </strong>
          {interviewData.jobExperience}
        </h2>
      </div>
    </div>
  )
}

export default Interview
