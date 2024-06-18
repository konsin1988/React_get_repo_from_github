import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (

    <nav className='fixed top-0 left-0 w-screen'>
      <div className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500
      text-white'>
          <h3 className='text-2xl font-bold'>Github Search</h3>
          <span className='font-bold '>
              <Link to="/" className='mr-4 hover:text-gray-200'>Home</Link>
              <Link to="/favourites" className='hover:text-gray-200'>Favourites</Link>
          </span>
      </div>
    </nav>
  )
}
