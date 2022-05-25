import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import  AddComment from './AddComment'

const Comments = ({docId,dateCreated,comments,commentInput}) => {
  const [comment,setComment] = useState(comments)
  return (
    <div>
        {
            comments.slice(0,3).map((item,index)=>(
                <div className='flex space-x-3 m-1' key={index}>
                <Link to={`/p/${item.displayName}`}>
                    <p className='font-semibold'>{item.displayName}</p>
                </Link>
                <p>{item.comment}</p>
                </div>
            ))
        }
        {
            comments.length  >= 3 &&
            <p className='cursor-pointer'>View all {comments.length} Comments</p>
        }
        <div className='m-1'>{formatDistance(dateCreated,new Date())} ago</div>
        <AddComment docId={docId} commentInput={commentInput} comment={comment} setComment={setComment}/>
    </div>
  )
}

export default Comments