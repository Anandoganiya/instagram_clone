import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../lib/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom'

const LogIn = () => {
  let navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const HandleFormValidatin = async(e) => {
    e.preventDefault();
    if(email === '' && password === ''){
      setError('Please enter all fields')
      return;
    }
    try{
       const res =  await signInWithEmailAndPassword(auth,email,password);
       setError('')
       navigate('/')
    }catch(error){
      setError(error.message)
      setEmail('')
      setPassword('')
    }
    
  }
  useEffect(()=>{
    document.body.style.backgroundColor = '#FAFAFA';
    document.title = 'Instagram Log-In';
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
            <form onSubmit={HandleFormValidatin} action="" method='POST' className='flex-col w-[80%] mx-auto'>
              <input value={email} onChange={({target})=>setEmail(target.value)} type="text" placeholder='username' className='mb-[1rem] rounded outline-none w-full bg-gray-100 p-2' />
              <input type="text" value={password} onChange={({target})=>setPassword(target.value)} placeholder='password' className='mb-[1rem] rounded outline-none w-full bg-gray-100 p-2'/>
              <button className='w-full bg-light-blue p-2 rounded font-medium text-[#ffffff]'>log In</button>  
            </form>
          </div>
            <h2 className='md:border md:border-gray-200 p-4 text-center md:mt-4'>
              Don't have an account? 
              <Link to={'/signup'}>
                <p className='text-light-blue  ml-1 inline-block'>Sign-Up</p>
              </Link>
            </h2>
      </div>
    </main>
  )
}

export default LogIn;