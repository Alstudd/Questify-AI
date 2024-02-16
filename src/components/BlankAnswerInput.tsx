import React from 'react'

type Props = {
    answer: string;
}

const BlankAnswerInput = ({ answer }: Props) => {
  return (
    <div>{answer}</div>
  )
}

export default BlankAnswerInput