import Navbar from '@/components/Navbar'
import QuizCreation from '@/components/QuizCreation'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
    const session = await getAuthSession()
    if (!session?.user) {
        return redirect("/")
    }
  return (
    <div>
      <Navbar />
      <QuizCreation />
    </div>
  )
}

export default page