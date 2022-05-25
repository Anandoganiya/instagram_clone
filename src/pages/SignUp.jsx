import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {auth,db} from '../lib/firebaseConfig';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import {userExits} from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
const SignUp = () => {
  let navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [fullname,setFullname] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const HandleFormValidatin = async(e) => {
    e.preventDefault();
    if(email === '' && password === '' && username === '' && fullname === ''){
      setError('Please enter all fields')
      return;
    }
    try{
      const doesUsernameExits = await userExits(username);
      if(!doesUsernameExits.length){
        const cres = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(auth.currentUser,{
          displayName:fullname,
        })
        const collectionRef = await collection(db,"users");
        await addDoc(collectionRef,{  
          dateCreated:Date.now(),
          emailAddress:email,
          followers:[],
          following:[],
          fullName:fullname,
          userId:cres.user.uid,
          username:username
        })
        navigate('/')
      }else{
        throw new Error('username already exits')
      }
      setError('')
    }catch(error){
      setError(error.message)
    }
  }
  useEffect(()=>{
    document.body.style.backgroundColor = '#FAFAFA';
    document.title = 'Instagram Sign-Up';
  },[])
  return (
    <main className='h-[100vh] flex justify-center md:items-center w-full'>
      <img className='w-[30%] hidden lg:inline-block' src="images/iphone-with-profile.jpg" alt="iphone with profile" />

      <div className='lg:w-[30%] bg-white'>
        <div className='w-full md:h-[30rem] md:border md:border-gray-200  flex-col'>
            <img src="images/logo.png" alt="instagram logo" className='mx-auto my-[2rem]' />
            {
              error?<div className='w-[80%] mx-auto my-[1rem] p-1 text-red-500 font-semibold'>{error}</div>
              :null
            }
            <form onSubmit={HandleFormValidatin} method='POST' className='flex-col w-[80%] mx-auto'>
              <input value={email} onChange={({target})=>setEmail(target.value)} type="text" placeholder='email' className='mb-[1rem] rounded outline-none w-full bg-gray-100 p-2' />
              <input value={username} onChange={({target})=>setUsername(target.value)} type="text" placeholder='username' className='mb-[1rem] rounded outline-none w-full bg-gray-100 p-2' />
              <input value={fullname} onChange={({target})=>setFullname(target.value)} type="text" placeholder='fullname' className='mb-[1rem] rounded outline-none w-full bg-gray-100 p-2' />
              <input type="text" value={password} onChange={({target})=>setPassword(target.value)} placeholder='password' className='mb-[1rem] rounded outline-none w-full bg-gray-100 p-2'/>
              <button className='w-full bg-light-blue p-2 rounded font-medium text-[#ffffff]'>Sign Up</button>  
            </form>
          </div>
            <h2 className='md:border md:border-gray-200 p-4 text-center md:mt-4'>
               have an account? 
              <Link to={'/login'}>
                <p className='text-light-blue  ml-1 inline-block'>Log-In</p>
              </Link>
            </h2>
      </div>
    </main>
  )
}

export default SignUp;