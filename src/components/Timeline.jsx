import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"; 
import usePhoto from '../hooks/user-photo';
import { Post } from '../components/post';
import useUser from '../hooks/user-info'
const Timeline = () => {
  const {userPhotos} = usePhoto()
  const {user:{following}} = useUser()
  return (
    <div className='sm:col-span-2 col-span-3'> 
      {
        following===undefined?(
          <Skeleton count={4} height={400} className="my-4"></Skeleton>
        ): 
        following.length === 0 ? (
          <div>Follow to see photos</div>
          ): userPhotos?(
            userPhotos.map(post=>{
            return <Post photoDetails={post} key={post.docId}/>})
          ):null
      }
    </div>
  )
}

export default Timeline;