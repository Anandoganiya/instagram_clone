import {useState,useEffect,useContext} from 'react'
import userContext from '../context/userContext'
import useUser from '../hooks/user-info';
import {getPostsPhotos} from '../services/firebase'
const usePhoto = () =>{
    const {user} = useContext(userContext);
    const userInfo = useUser();
    const [userPhotos,setUserPhotos] = useState([])
    useEffect(()=>{
      const getFollowersPosts = async()=>{
        const res = await getPostsPhotos(user.uid,userInfo.user.following)
        setUserPhotos(res)
      }
      if(userInfo.user.following && user){
        getFollowersPosts()
      }
    },[user,userInfo.user.following])
    return {userPhotos};
}

export default usePhoto;