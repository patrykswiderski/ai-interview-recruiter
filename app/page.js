import { Button } from '../components/ui/button'
import Image from 'next/image'
import Hero from './dashboard/_components/Hero'
import How from './dashboard/how/page'

export default function Home() {
  return (
    <div>
      <Hero />
      <How />
    </div>
  )
}
