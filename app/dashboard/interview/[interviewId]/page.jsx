'use client'
import React, { useEffect, useState } from 'react'
import { AiRecruiterInterview } from '../../../../utils/schema'
import { db } from '../../../../utils/db'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import Link from 'next/link'

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  useEffect(() => {
    // console.log(params.interviewId)
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
    <div className="h-screen">
      <div className="my-6 flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl md:text-3xl ">Let's start!</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10">
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

            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 text-yellow-500 text-sm md:text-normal">
              <h2 className="flex gap-2 items-center">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            {webCamEnabled ? (
              <>
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  style={{
                    height: 288,
                    width: '100%',
                    marginBottom: '1.25rem',
                    borderRadius: '10px',
                    border: 'rgb(229, 229, 229) solid 1px',
                    background: 'rgb(245, 245, 245)',
                  }}
                />
                <Button
                  variant="ghost"
                  className="w-full font-semibold text-neutral-500 border border-neutral-00"
                  onClick={() => setWebCamEnabled(false)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </>
            ) : (
              <>
                <WebcamIcon className="h-72 w-full p-20 mb-5 rounded-lg border bg-secondary" />
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
        <div className="flex w-full justify-center md:justify-end items-end pt-5 md:pt-2">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="hover:scale-105 transition-all">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Interview
