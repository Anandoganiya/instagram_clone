import React,{useState} from 'react'
import {updateFollowersOfUser,updateFolllowingOfCurrentUser} from '../services/firebase'
import { Link } from 'react-router-dom'
const SuggestionProfile = ({suggestedUser,userId,userDocId}) => {
  const [followed,setFollowed] = useState(false)
  const setSuggestionFollow = async() => {
      setFollowed(true);
      await updateFollowersOfUser(suggestedUser.docId,userId,false);
      await updateFolllowingOfCurrentUser(suggestedUser.userId,userDocId,false);
    return;
  }
  return (
      <>
    {
        !followed?
        <div key={suggestedUser.docId} className='w-full flex justify-between'>
            <Link to={`/p/${suggestedUser.username}`}>
                <div className='w-8 shrink-0 flex space-x-4 mb-4'>
                    <img className='w-full rounded-full' src={`/images/avatars/${suggestedUser.username}.jpg`} alt={`${suggestedUser.username} profile`} />
                    <p className='self-baseline'>{suggestedUser.username}</p>
                </div>
            </Link>
            <button className='text-light-blue self-baseline' onClick={setSuggestionFollow}>Follow</button>
        </div>
    :null
    }
    </>
  )
}

export default SuggestionProfile