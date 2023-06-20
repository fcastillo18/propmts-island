'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={prompt.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const handleSearchTextChange = (e) => {}

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data);
      console.log(data)
    }
    fetchData();
  }, [])
  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a username or tag"
          value={searchText}
          onChange={handleSearchTextChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed