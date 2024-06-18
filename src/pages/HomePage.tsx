import React, { useEffect, useState } from 'react'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'
import {useDebounce} from '../hooks/debounce'
import { RepoCard } from '../components/RepoCard'

export const HomePage = () => {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  let debounced =  useDebounce(search)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })

  const [fetchRepos, { isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdown(debounced.length >= 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    
    setSearch('')
    fetchRepos(username)
  }
  

  return (
    <div className='flex justify-center pt-20 mx-auto min-h-screen w-screen bg-blue-100'>
      { isError && <p className='text-center text-red-600'>Something went wrong...</p>}
     <div className='relative w-[560px]'>
      <input type='text'
      className='border rounded-xl py-2 px-4 w-full h-[43px] mb-2 outline-0 text-gray-900 font-medium'
      placeholder='Search for github users'
      name='search'
      id='searchInput'
      value={search}
      onChange={e => setSearch(e.target.value)}
      />

      {dropdown && <ul className="list-none absolute top-[43px] left-0 right-0 shadow-md bg-white rounded-md mt-2 p-2 max-h-[250px] z-10">
        {isLoading && <p className='text-center'>Loading...</p>}
        { debounced.length >= 3 && data?.map(user => (
          <li key={user.id}
          className='hover:bg-gray-400 rounded-lg hover:cursor-pointer hover:text-white'
          onClick={() => clickHandler(user.login)}
          > {user.login}</li>
        ))}
      </ul>}
     <div className="px-3 pt-3">
      {areReposLoading && <p className='text-center '>Repos are loading...</p>}
      {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
     </div>
     </div>
    </div>
  )
}
