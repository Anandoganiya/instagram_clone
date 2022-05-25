import { useEffect,useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../lib/firebaseConfig';
export const useAuth = () =>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    useEffect(()=>{
        const subscriber = onAuthStateChanged(auth,(authUser)=>{
            if(authUser){
                localStorage.setItem('authUser',JSON.stringify(authUser))
                setUser(authUser)
            }else{
                localStorage.removeItem('authUser')
                setUser(null)
            }
        });
        return ()=>subscriber();
    },[auth])
    return {user};
}