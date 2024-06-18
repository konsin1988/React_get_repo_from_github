import React, {useState} from 'react'
import { IRepo } from '../models/models'
import { Link } from 'react-router-dom'
import { githubApi } from '../store/github/github.api'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'


export const RepoCard = ({repo}: {repo: IRepo}) => {

  const { addFavourite, removeFavourite } = useActions()
  const { favourites } = useAppSelector(state => state.github)

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))
  
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavourite(repo.html_url)
    setIsFav(true)
  }
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavourite(repo.html_url)
    setIsFav(false)
  }

  return (
    <div className='py-3 px-5 rounded-lg mb-2 hover:shadow-md hover:bg-gray-100 transition-all relative flex'>
      <Link to={repo.html_url} target='_blank' className='w-full'>
          <h2 className='text-lg font-bold pr-10 mr-36'>{repo.full_name}</h2>
          <p className='text-sm '>
              Forks: <span className='font-bold mr-2'>{repo.forks}</span>
              Watchers: <span className='font-bold'>{repo.watchers}</span>
          </p>
          <p className='text-sm font-thin mr-40'>{repo?.description}</p>
        </Link>
      {!isFav && <button className='absolute bottom-0 right-0 mb-2 mr-2 py-2 px-4 bg-slate-300 rounded-md' 
      onClick={addToFavourite}
      >Add to Favorites</button>}
      {isFav && <button className='absolute bottom-0 right-0 mb-2 mr-2 py-2 px-4 bg-red-300 rounded-md' 
      onClick={removeFromFavourite}
      >Remove from Favourites</button>}
    </div>
  )
}
