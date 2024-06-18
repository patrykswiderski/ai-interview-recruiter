'use client'
import React, { use, useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { AiRecruiterInterview } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import QuestionSection from './_component/QuestionSection'
import RecordAnswerSection from './_component/RecordAnswerSection'
import { Button } from '../../../../../components/ui/button'
import Link from 'next/link'

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState()
  const [airInterviewQuestion, setAirInterviewQuestion] = useState()
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(AiRecruiterInterview)
      .where(eq(AiRecruiterInterview.ariId, params.interviewId))

    const jsonAirResp = JSON.parse(result[0].jsonAriResp)
    console.log(jsonAirResp)
    setAirInterviewQuestion(jsonAirResp)
    setInterviewData(result[0])
  }

  return (
    <div className="h-min-content md:h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:items-center lg:gap-10">
        {/* {Questions} */}
        <QuestionSection
          airInterviewQuestion={airInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />

        {/* {Video / Audio recording} */}
        <RecordAnswerSection
          airInterviewQuestion={airInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="mt-10 lg:mt-0 flex justify-center md:justify-end gap-6 ">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            className="hover:scale-105 transition-all"
          >
            Previous question
          </Button>
        )}
        {activeQuestionIndex != airInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            className="hover:scale-105 transition-all"
          >
            Next question
          </Button>
        )}
        {activeQuestionIndex == airInterviewQuestion?.length - 1 && (
          <Link
            href={'/dashboard/interview/' + interviewData?.ariId + '/feedback'}
          >
            <Button className="hover:scale-105 transition-all">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default StartInterview
