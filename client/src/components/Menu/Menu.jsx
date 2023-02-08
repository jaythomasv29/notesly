import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import "./Menu.scss"
const Menu = ({category, ignoreId}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/posts?cat=${category}`)
      const otherPosts = response.data.filter(post => post.id !== ignoreId);
      setPosts(otherPosts)
    }
    fetchPosts();
  }, [category])
 
  return (
    <div className="menu">
      <h1>Other posts you might like</h1>
      {
        posts.map(post => (
          <div className="post" key={post.id}>
            <img src={`../uploads/${post.post_img}`} />
            <h2>{post.title}</h2>
            <button className="read-more-btn">Read More</button>
          </div>
        ))
      }
    </div>
  )
}

export default Menu