'use client'
import Image from 'next/image'
import WebCamImg from '../../../../../../public/webcam.png'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../components/ui/button'
import { RiRecordCircleFill } from 'react-icons/ri'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { is } from 'drizzle-orm'
import { toast } from 'sonner'
import { chatSession } from '../../../../../../utils/GeminiAIModel.js'

function RecordAnswerSection({ airInterviewQuestion, activeQuestionIndex }) {
  const [userAnswer, setUserAnswer] = useState('')

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript),
    )
  }, [results])

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText()
      if (userAnswer?.length < 10) {
        toast('Error occurred, please try record again.')
        return
      }
      const feedbackPrompt =
        'Question: ' +
        airInterviewQuestion[activeQuestionIndex]?.question +
        ' User Answer: ' +
        userAnswer +
        '. Depends on question and user answer for given interview question is saved in the database. Please give me rating for user answer and feedback as area of improvement if there are any, in just 3 to 5 lines to improve it. Everything in JSON format with rating and feedback.'

      try {
        console.log(feedbackPrompt)
        const result = await chatSession.sendMessage(feedbackPrompt)
        const airJsonResponse = result.response
          .text()
          .replace('```json', '')
          .replace('```', '')
        const JsonFeedbackResponse = JSON.parse(airJsonResponse)
      } catch (error) {
        toast('Failed to send message. Please try again.')
      }
    } else {
      startSpeechToText()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col my-2 md:my-5 justify-center items-center rounded-lg p-5 bg-black w-full">
        <Image src={WebCamImg} width={200} height={200} className="absolute" />
        <Webcam
          mirrored={true}
          style={{ width: '100%', height: 300, zIndex: 10 }}
        />
      </div>
      <Button
        className={`bg-white text-red-600 border border-red-600 hover:text-white hover:bg-red-600 transition-all flex gap-2 items-center justify-center ${isRecording ? 'pulse' : ''}`}
        onClick={SaveUserAnswer}
      >
        {isRecording ? (
          <>
            <Mic />
            <p>Recording...</p>
          </>
        ) : (
          <>
            <RiRecordCircleFill className="text-xl" />
            <p>Record Answer</p>
          </>
        )}
      </Button>

      <Button className="mt-10" onClick={() => console.log(userAnswer)}>
        Show User Answer
      </Button>
    </div>
  )
}

export default RecordAnswerSection
