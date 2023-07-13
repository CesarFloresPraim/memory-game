import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Over() {
  const navigate = useNavigate()
  const { overState } = useSelector(state => state.game)
  return (
    <div className='h-screen w-screen bg-gradient-to-t from-teal-500 to-indigo-500 flex flex-col gap-6 items-center justify-center'>
      <div className='text-white text-3xl font-bold'>{overState}</div>
      <button onClick={()=>navigate({pathname:"/game"})} className=' hover:animate-bounce bg-white text-indigo-500 rounded-[32px] px-4 py-2'>Play again!</button>
    </div>
  )
}
