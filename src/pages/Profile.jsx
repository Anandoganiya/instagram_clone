import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Header } from '../components'
import UserProfile from '../components/profile/UserProfile'
import {getUserByUsername} from '../services/firebase'
const Profile = () => {
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  const {username} = useParams()
  useEffect(() => {
    const getUser = async() =>{
      const [userInfo]  = await getUserByUsername(username)
      if(userInfo?.userId){
        setUser(userInfo)
      }else{
        navigate('/p/not-found')
      }
    }
    if(username){
      getUser()
    }
  }, [username])
  
  return (
    <div>
      <Header/>
      <div className='mx-auto w-3/4'>
        <UserProfile userInfo={user}/>
      </div>
    </div>
  )
}

export default Profile