import React from 'react'

const Image = ({imgSrc}) => {
  return (
    <div className='w-full'>
        <img className='w-full' src={imgSrc} alt="user Post" />
    </div>
  )
}

export default Image