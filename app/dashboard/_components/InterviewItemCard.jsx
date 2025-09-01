import React from 'react'

function InterviewItemCard({interview}) {

  return (
    <div className='border shadow-sm rounded-lg p-3'>
    <h2 className='font-bold text-primary'>{interview.jobPosition}</h2>
      <h2  className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
      <h2 className='text-xs text-gray-400'>
  Created At: {new Date(interview.createdAt).toLocaleDateString()}
</h2>
      </div>
  )
}

export default InterviewItemCard