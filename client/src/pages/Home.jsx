import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.scss"

const Home = () => {

  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, nam!",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, maiores dolorem iure doloribus quos at esse libero et eum quibusdam!",
      img: "https://images.pexels.com/photos/7034219/pexels-photo-7034219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 2,
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, nam!",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, maiores dolorem iure doloribus quos at esse libero et eum quibusdam!",
      img: "https://images.pexels.com/photos/9945333/pexels-photo-9945333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: 3,
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, nam!",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim, maiores dolorem iure doloribus quos at esse libero et eum quibusdam!",
      img: "https://images.pexels.com/photos/10488748/pexels-photo-10488748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },

  ]
  return (
    <div className="home">
      <div className="posts">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <div className="img">
            <img src={post.img} />
              
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}><h1>{post.title}</h1></Link>
              <p>{post.desc}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home