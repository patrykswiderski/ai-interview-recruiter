'use client'
import Image from 'next/image'
import WebCamImg from '../../../../../../public/webcam.png'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../components/ui/button'
import { RiRecordCircleFill } from 'react-icons/ri'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'

function RecordAnswerSection() {
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
        className={`bg-red-600 text-white hover:scale-105 hover:bg-red-600 transition-all flex gap-2 items-center justify-center ${isRecording ? 'pulse' : ''}`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <>
            <Mic />
            <p>Recording...</p>
          </>
        ) : (
          <>
            <RiRecordCircleFill className="text-lg" />
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
