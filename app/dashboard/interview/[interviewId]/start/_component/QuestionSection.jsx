import { Lightbulb } from 'lucide-react'
import React from 'react'

function QuestionSection({ airInterviewQuestion, activeQuestionIndex }) {
  return (
    airInterviewQuestion && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {airInterviewQuestion &&
            airInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer hover:scale-105 transition-all ${
                  activeQuestionIndex === index
                    ? 'bg-primary text-white font-light'
                    : 'bg-secondary'
                }`}
                key={index}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {airInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <div className="p-5 border rounded-lg bg-pink-100 text-pink-800 text-sm md:text-normal mt-20">
          <h2 className="flex gap-2 items-center">
            <Lightbulb />
            <strong>Note</strong>
          </h2>
          <h2 className="my-2 text-sm">{process.env.NEXT_PUBLIC_NOTE}</h2>
        </div>{' '}
      </div>
    )
  )
}

export default QuestionSection
