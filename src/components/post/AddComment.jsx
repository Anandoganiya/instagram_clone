import {useState} from 'react'
import useUser from '../../hooks/user-info'
import { arrayUnion,updateDoc,doc, } from 'firebase/firestore'
import {db} from '../../lib/firebaseConfig'
const AddComment = ({commentInput,comment,setComment,docId}) => {
  const [inputComment,setInputComment] = useState('')
  const {user:{username}} = useUser()
  const handleCommentForm = async(e) => {
    e.preventDefault()
    setComment([{displayName:username,comment:inputComment},...comment])
    console.log(comment);
    setInputComment('')
    const docRef = doc(db, 'photos', docId)
    await updateDoc(docRef,{
        comments:arrayUnion({displayName:username,comment:inputComment})
    })
}
  return (
    <div className="w-full">
        <form action="" onSubmit={(e)=>inputComment.length >= 1?handleCommentForm(e):e.preventDefault()} className="w-full flex border justify-between">
            <input type="text" ref={commentInput} value={inputComment} placeholder='Add a comment'
             onChange={({target})=>setInputComment(target.value)}
             className='w-full outline-none p-1'/>
            <button disabled={inputComment.length < 1} className="w-[5rem] bg-gray-100">submit</button>
        </form>
    </div>
  )
}

export default AddComment