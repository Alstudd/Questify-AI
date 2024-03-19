import Chatbot from '@/components/Chatbot'
import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Navbar />
        <Chatbot />
    </div>
  )
}

export default page