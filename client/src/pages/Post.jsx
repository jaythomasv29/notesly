import React from 'react'
import "./Post.scss";
import { Link, useParams } from 'react-router-dom'

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Menu from '../components/Menu/Menu';

export const Post = () => {
  const { id } = useParams();
  return (
    <div className="post">
      <div className="content">
        <img src="https://images.pexels.com/photos/7034219/pexels-photo-7034219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <div className="user">
          <img src="https://images.pexels.com/photos/12509454/pexels-photo-12509454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          <div className="info">
            <span>James</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="controls">
            <div className="circle edit">
              <Link className="link" to={`write?edit=2`}>
                <ModeEditIcon />
              </Link>

            </div>
            <div className="circle delete">
              <Link to={`/`}>
                <HighlightOffIcon />
              </Link>
            </div>
          </div>
        </div>
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, aut.</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque mollitia quod modi rem, veniam necessitatibus nisi vel impedit tenetur culpa placeat perferendis quas tempora? Inventore explicabo quas labore earum eius nulla fuga, similique asperiores porro culpa rerum vitae quae ducimus sapiente, blanditiis saepe vero nam itaque modi minus. Architecto, vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur ipsam libero qui a eos eligendi quasi! Molestias itaque porro nam recusandae iure voluptates consectetur commodi officia, iste mollitia! Assumenda aspernatur ipsa id, atque molestias repellat quasi eligendi laudantium laborum facilis doloribus necessitatibus quas similique provident sequi voluptatem rerum? Iusto, nostrum!</p>
        
        
      </div>
          <Menu />
    </div>
  )
}
