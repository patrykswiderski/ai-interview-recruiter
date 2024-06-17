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
import { db } from '../../../../../../utils/db'
import { UserAnswer } from '../../../../../../utils/schema'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'

function RecordAnswerSection({
  airInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setHasPermission(true)
      })
      .catch(() => {
        setHasPermission(false)
      })
  }, [])

  useEffect(() => {
    if (!isRecording) return

    if (userAnswer) {
      setUserAnswer('')
    }

    results.forEach((result) =>
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript),
    )
  }, [results, isRecording])

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer()
    }
  }, [userAnswer, isRecording])

  const StartStopRecording = async () => {
    if (!hasPermission) {
      toast('Please allow microphone access to record.')
      return
    }
    if (isRecording) {
      stopSpeechToText()
      if (userAnswer?.length < 10) {
        setLoading(false)
        return
      }
    } else {
      setResults([])
      setUserAnswer('')
      startSpeechToText()
    }
  }

  const UpdateUserAnswer = async () => {
    setLoading(true)

    const question = airInterviewQuestion[activeQuestionIndex]?.question
    const feedbackPrompt = `Question: ${question} User Answer: ${userAnswer}. Depends on question and user answer for given interview question is saved in the database. Please give me rating for user answer and feedback as area of improvement if there are any, in just 3 to 5 lines to improve it. Everything in JSON format with rating and feedback.`

    try {
      const result = await chatSession.sendMessage(feedbackPrompt)
      const airJsonResponse = await result.response.text()
      const cleanedJsonResponse = airJsonResponse.replace(/```json|```/g, '')
      const JsonFeedbackResponse = JSON.parse(cleanedJsonResponse)

      const response = await db.insert(UserAnswer).values({
        airIdRef: interviewData?.ariId,
        question: question,
        userAnswer: userAnswer,
        correctAnswer: airInterviewQuestion[activeQuestionIndex]?.answer,
        feedback: JsonFeedbackResponse.feedback,
        rating: Number(JsonFeedbackResponse.rating),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD/MM/YYYY HH:mm'),
      })

      if (response) {
        toast('User answer saved successfully.')
      } else {
        toast('Failed to save user answer. Please try again.')
      }
    } catch (error) {
      toast('Failed to process or save user answer. Please try again.')
      console.error('Error:', error)
    } finally {
      setResults([])
      setUserAnswer('')
      setLoading(false)
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
        disabled={loading || !hasPermission}
        className={`bg-white text-red-600 border border-red-600 hover:text-white hover:bg-red-600 transition-all flex gap-2 items-center justify-center ${isRecording ? 'pulse' : ''}`}
        onClick={StartStopRecording}
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

      {/* <Button className="mt-10" onClick={() => console.log(userAnswer)}>
        Show User Answer
      </Button> */}
    </div>
  )
}

export default RecordAnswerSection
