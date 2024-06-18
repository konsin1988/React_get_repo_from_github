import React from 'react'
import { useAppSelector } from '../hooks/redux'
import {RepoCard} from "../components/RepoCard"
import { Link } from 'react-router-dom'

export const FavouritesPage = () => {

  const { favourites } = useAppSelector(state => state.github)

  return (
    <div className='flex justify-center pt-20 mx-auto min-h-screen w-screen bg-blue-100'>

    {!favourites.length && <p className='text-center'>No items added</p>}
    <ul className='list-none'>
      {favourites?.map(favorite => (
        <li key={favorite}>
          <Link to={favorite} target='_blank'>{favorite}</Link>
        </li>
      ))}

    </ul>
    </div>
    
  )
}
