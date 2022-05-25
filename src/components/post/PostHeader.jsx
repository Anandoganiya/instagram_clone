import React from 'react';
import { Link } from 'react-router-dom'

const PostHeader = ({username}) => {
  return (
    <Link to={`/p/${username}`}>
        <div className='flex w-full p-1'>
            <div className='w-8 mr-4'>
                <img className='w-full rounded-full' src={`images/avatars/${username}.jpg`} alt={`${username} profile `} />
            </div>
            <div>{username}</div>
        </div>
    </Link>
  )
}

export default PostHeader