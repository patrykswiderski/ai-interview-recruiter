'use client'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([])
  const router = useRouter()

  useEffect(() => {
    GetFeedback()
  }, [])

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.airIdRef, params.interviewId))
      .orderBy(UserAnswer.id)
    console.log(result)
    setFeedbackList(result)
  }

  const getHighestRatingFeedback = (feedbackList) => {
    const highestRatingMap = new Map()

    feedbackList.forEach((item) => {
      if (
        !highestRatingMap.has(item.question) ||
        highestRatingMap.get(item.question).rating < item.rating
      ) {
        highestRatingMap.set(item.question, item)
      }
    })

    return Array.from(highestRatingMap.values())
  }

  const filteredFeedbackList = getHighestRatingFeedback(feedbackList)

  const calculateOverallRating = (filteredFeedbackList) => {
    if (filteredFeedbackList.length === 0) return 0
    const totalRating = filteredFeedbackList.reduce(
      (sum, item) => sum + Number(item.rating),
      0,
    )
    console.log(totalRating)
    return (totalRating / filteredFeedbackList.length).toFixed(1)
  }

  const overallRating = calculateOverallRating(filteredFeedbackList)

  return (
    <div className="md:p-10 ">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl mt-5">
          No interview feedback record found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-600">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-lg my-3">
            Your overall interview rating: <strong>{overallRating}/10</strong>
          </h2>

          <h2 className="text-sm text-neutral-500">
            Find below interview question with correct answer, Your answer and
            feedback to improvement
          </h2>
          {filteredFeedbackList &&
            filteredFeedbackList.map((item, index) => (
              <Collapsible
                key={index}
                className="mt-7 border border-neutral-300 rounded-lg"
              >
                <CollapsibleTrigger className="p-2 flex justify-between gap-6 bg-secondary rounded-lg text-left w-full">
                  {index + 1 + '. ' + item.question}{' '}
                  <ChevronsUpDown className="w-10 h-10 md:h-5 md:w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mx-2 mb-2 md:mx-5">
                  <div className="flex flex-col gap-2">
                    <h2
                      className={`p-2 mt-2 text-center md:text-left text-sm rounded-lg ${
                        item.rating < 4
                          ? 'text-red-700 bg-red-50'
                          : item.rating <= 6
                            ? 'text-yellow-800 bg-orange-50'
                            : 'text-green-800 bg-green-50'
                      }`}
                    >
                      <strong>Rating: </strong>
                      {item.rating}/10
                    </h2>
                    <h2
                      className={`text-sm p-2  rounded-lg ${
                        item.rating < 4
                          ? 'text-red-700 bg-red-50'
                          : item.rating <= 6
                            ? 'text-yellow-800 bg-orange-50'
                            : 'text-green-800 bg-green-50'
                      }`}
                    >
                      <strong>Your answer: </strong>
                      {item.userAnswer}
                    </h2>
                    <h2 className="bg-green-50 text-sm p-2  rounded-lg text-green-900">
                      <strong>Correct answer: </strong>
                      {item.correctAnswer}
                    </h2>
                    <h2 className="bg-blue-50 text-sm p-2  rounded-lg text-blue-800 md:mb-2">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <div className="flex justify-end mt-5">
        <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
      </div>
    </div>
  )
}

export default Feedback
