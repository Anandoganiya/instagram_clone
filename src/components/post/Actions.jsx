import React,{useState} from 'react'
import {db} from '../../lib/firebaseConfig'
import { arrayRemove, arrayUnion,doc,updateDoc } from 'firebase/firestore'
import useUser from '../../hooks/user-info'
const Actions = ({didUserLiked,totalLikes,docId,handleFocus}) => {
    const [isLiked,setIsLiked] = useState(didUserLiked);
    const [likes,setLikes] = useState(totalLikes)
    const {user} = useUser()
    const handleLikes = async()=>{
      setIsLiked(!isLiked);
      setLikes(!likes?likes+1:likes-1)
        const docRef = await doc(db,'photos',docId)
         await updateDoc(docRef,{
            likes:!isLiked?arrayUnion(user.userId):arrayRemove(user.userId)
        })
    }
  return (
    <>
    <div className='flex space-x-2 m-1'>
       <div className='cursor-pointer' onClick={handleLikes}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={`${isLiked?"red":"none"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
       </div>
       <div className='cursor-pointer' onClick={handleFocus}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
       </div>
    </div>
    <span className='m-1'>{likes === 1 ? `${likes} like`:`${likes} likes`}</span>
    </>
  )
}

export default Actions;