import React,{useState,useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/user-info'
import {isLoggedInFollowing,toggleFollow} from '../../services/firebase'
const Header = ({profile,photosCollection,followersLength,setFollowCount}) => {
  const [isFollowingProfile,setIsFollowingProfie] = useState(false)
  const {user} = useUser()
  const followBtn = user.username && user.username !== profile.username;
  const handleToggleFollow = async () => {
    setIsFollowingProfie(!isFollowingProfile)
    setFollowCount(
      {
        followersLength: isFollowingProfile ? followersLength - 1 :  followersLength + 1
      }
    )
    await toggleFollow(user.userId,user.docId,profile.userId,profile.docId,isFollowingProfile)
  }
  useEffect(()=>{
    const isLoggedInUserFollowing = async () =>{
      const isFollowing = await isLoggedInFollowing(user.userId,profile.userId);
      setIsFollowingProfie(isFollowing)
      
    }
    if(user.userId && profile.userId){
      isLoggedInUserFollowing()
    }
  },[user.userId,profile.userId])  
  return (
    <header className='w-full grid grid-cols-3 mt-4'>
      <div className='w-[5rem] md:w-[8rem]'>
        {
          profile.username?
          <img className='w-full rounded-full' src={`/images/avatars/${profile.username}.jpg`} alt={`${profile.username} profile`} />
          :
          <Skeleton circle count={1} height={150} width={150}/>
        }
      </div>
      <div>
        <div className='flex flex-col'>
          <div className='flex space-x-4'>
            <p className=''>{profile.username}</p>
            {
              followBtn ? 
              <button onClick={handleToggleFollow} className='bg-[#458eff] p-1 rounded text-white'>{isFollowingProfile?'unfollow':'follow'}</button>
              :
              null
            }
          </div>
            {
              profile.followers === undefined || profile.following === undefined ?(
                <Skeleton count={1} width={677} height={24} />
              ): (
                <div className='flex mt-4 space-x-4 container'>
                  <p>
                    <span>{photosCollection.length} photos</span>
                  </p>
                  <p>
                    <span>{followersLength} followers</span>
                  </p>
                  <p>
                    <span>{profile.following.length} following</span>
                  </p>
                </div>
              )
            }
          <div className="container mt-4">
          <p className="font-medium">{!profile.fullName ? <Skeleton count={1} height={24} /> : profile.fullName}</p>
        </div>
        </div>
      </div>
    </header>
  )
}

export default Header