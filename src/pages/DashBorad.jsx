import React,{useEffect} from 'react'
import {Header,Timeline,Sidebar} from '../components/index';
const DashBorad = () => {
  useEffect(()=>{
    document.body.classList = 'bg-gray-50'
  })
  return (
    <div className='h-screen'>
      <Header/>
      <div className='md:w-3/4 w-full mx-auto grid grid-cols-3'>
        <Timeline/>
        <Sidebar/>
      </div>
    </div>
  )
}

export default DashBorad