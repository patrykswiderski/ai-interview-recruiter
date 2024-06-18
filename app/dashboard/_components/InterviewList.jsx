'use client'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { AiRecruiterInterview } from '../../../utils/schema'
import { db } from '../../../utils/db'
import InterviewCardItem from './InterviewCardItem'

function InterviewList() {
  const { user, isLoaded } = useUser()
  const [interviewList, setInterviewList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      GetInterviewList(user.primaryEmailAddress.emailAddress)
    }
  }, [isLoaded, user])

  const GetInterviewList = async (emailAddress) => {
    try {
      const result = await db
        .select()
        .from(AiRecruiterInterview)
        .where(eq(AiRecruiterInterview.createdBy, emailAddress))

      setInterviewList(result)
      // console.log(result)
    } catch (error) {
      console.error('Error fetching interviews:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen">
      <h2 className="font-md text-lg font-semibold">
        Previous AI Recruiter Interview
      </h2>

      <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewCardItem key={index} interview={interview} />
          ))}
      </div>
    </div>
  )
}

export default InterviewList
