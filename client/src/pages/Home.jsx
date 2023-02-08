import React from 'react';

import axios from "axios";
import { useState, useEffect } from 'react';
import moment from "moment"
import { Link, useLocation } from 'react-router-dom';
import "./Home.scss"

const Home = () => {
  const [posts, setPosts] = useState([])
  const category = useLocation().search;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts${category}`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData()

  }, [category])
  
  const getRichText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent

  }

  return (
    <div className="home">
      <div className="posts">
        
        {posts.map(post => (
          <div className="post" key={post.id}>
            
            <div className="img">
              <img src={`./uploads/${post.post_img}`} />
              

            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
              
              <p>{getRichText(post.desc)} <span className="author-details">By {post.username} Posted {moment(post?.date).startOf("hour").fromNow()}</span></p>  
              <button>Read More</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home