import React,{useRef} from 'react'
import PostHeader from './PostHeader'
import Image from './Image'
import Footer from './Footer'
import Actions from './Actions'
import Comments from './Comments'
const Post = ({photoDetails}) => {
  const commentInput = useRef();
  const handleFocus = () => {
    commentInput.current.focus();
  }
  return (
    <div className='border my-4 w-[60%] md:w-[75%] mx-auto bg-white'>
      <PostHeader username={photoDetails.username} />
      <Image imgSrc={photoDetails.imageSrc} />
      <Actions handleFocus={handleFocus} docId={photoDetails.docId} didUserLiked={photoDetails.userLikedPhoto} totalLikes={photoDetails.likes.length}/>
      <Footer  caption={photoDetails.caption} username={photoDetails.username}/>
      <Comments docId={photoDetails.docId} commentInput={commentInput} dateCreated={photoDetails.dateCreated} comments={photoDetails.comments}/>
    </div>
  )
}

export default Post;