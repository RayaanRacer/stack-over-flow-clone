import React from 'react'
import Question from './Question'

export default function QuestionList({questionList}) {
  return (
    <>
    {
     questionList?.data?.map((question) =>(
         <Question key={question._id} question={question}/>
     ))
    }
    </>
  )
}
