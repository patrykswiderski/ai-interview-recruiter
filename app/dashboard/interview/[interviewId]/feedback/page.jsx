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

  return (
    <div className="p-10 ">
      <h2 className="text-3xl font-bold text-green-600">Congratulation!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>

      <h2 className="text-sm text-neutral-500">
        Find below interview question with correct answer, Your answer and
        feedback to improvement
      </h2>
      {filteredFeedbackList &&
        filteredFeedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-2 flex justify-between gap-6 bg-secondary rounded-lg my-2 text-left w-full">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-red-600 p-2 border rounded-lg">
                  <strong>Rating: </strong>
                  {item.rating}/10
                </h2>
                <h2 className="bg-red-50 text-sm p-2 border rounded-lg text-red-900">
                  <strong>Your answer: </strong>
                  {item.userAnswer}
                </h2>
                <h2 className="bg-green-50 text-sm p-2 border rounded-lg text-green-900">
                  <strong>Correct answer: </strong>
                  {item.correctAnswer}
                </h2>
                <h2 className="bg-blue-50 text-sm p-2 border rounded-lg text-blue-800">
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
