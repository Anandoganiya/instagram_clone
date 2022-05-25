import React from 'react';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
const User = ({username,fullname}) => {
  return (
    <>    
      {
        !username && !fullname ? 
          <Skeleton count={1} height={60}/>
        :
          <Link to={`/p/${username}`}>
            <div className='flex space-x-3 p-4 w-full'>
              <div className='w-10 shrink-0'>
              <img className='w-full rounded-full' src={`/images/avatars/${username}.jpg`} alt={`${username} profile`} />
              </div>
              <div>
                <div className='font-medium text-black'>{username}</div>
                <div className='text-gray-500 font-medium'>{fullname}</div>
              </div>
            </div>
          </Link>
      }
    </>
    );
}

export default React.memo(User);