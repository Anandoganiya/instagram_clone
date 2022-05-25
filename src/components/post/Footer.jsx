import React from 'react'

const Footer = ({caption,username}) => {
  return (
    <div className='flex space-x-3 m-1'>
      <div className='font-semibold'>{username}</div>
      <div>{caption}</div>
    </div>
  )
}

export default Footer