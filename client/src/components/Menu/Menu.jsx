import React from 'react'
import "./Menu.scss"
const Menu = () => {
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
    <div className="menu">
      <h1>Other posts you might like</h1>
      {
        posts.map(post => (
          <div className="post" key={post.id}>
            <img src={post.img} />
            <h2>{post.title}</h2>
            <button className="read-more-btn">Read More</button>
          </div>
        ))
      }
    </div>
  )
}

export default Menu