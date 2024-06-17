import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  return (
    <div className="p-1 md:p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="font-gray-500">
        Create and Start your AI Recruiter Interview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/* Previous Interview List */}
      <InterviewList />
    </div>
  )
}

export default Dashboard
