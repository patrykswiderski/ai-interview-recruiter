import Image from 'next/image'
import WebCamImg from '../../../../../../public/webcam.png'
import React from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../components/ui/button'
import { RiRecordCircleFill } from 'react-icons/ri'

function RecordAnswerSection() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-col my-2 md:my-5 justify-center items-center rounded-lg p-5 bg-black/90 w-full">
        <Image src={WebCamImg} width={200} height={200} className="absolute" />
        <Webcam
          mirrored={true}
          style={{ width: '100%', height: 300, zIndex: 10 }}
        />
      </div>
      <Button className="bg-red-600 text-white hover:scale-105 hover:bg-red-600 transition-all flex gap-2 items-center justify-center">
        <p>Record Answer</p>
        <RiRecordCircleFill className="text-lg" />
      </Button>
    </div>
  )
}

export default RecordAnswerSection
