import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation'

function InterviewCardItem({ interview }) {
  const router = useRouter()

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.ariId)
  }

  const onFeedback = () => {
    router.push('/dashboard/interview/' + interview?.ariId + '/feedback')
  }

  return (
    <div className="border shadow-md rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-neutral-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-neutral-400">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex justify-between mt-3 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  )
}

export default InterviewCardItem
