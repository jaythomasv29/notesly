import React, { useState } from "react"
import "./Post.scss";
import { Link, useParams } from "react-router-dom"

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Menu from "../components/Menu/Menu";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const Post = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const [post, setPost] = useState({});

  const calculateDaysFromPresent = date => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const today = new Date();
    const publishedDate = new Date(date);
    return (Math.round(Math.abs(today - publishedDate) / oneDay));

  }
  calculateDaysFromPresent(post.date)

  console.log(post);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, [id])
  return (
    <div className="post">
      <div className="content">
        <img src={post.img} />
        <div className="user">
          <img src={post?.user_img || "https://images.pexels.com/photos/12509454/pexels-photo-12509454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).startOf("hour").fromNow()}</p>
          </div>
          {
            currentUser.username === post.username &&
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
          }
        </div>
        <h1>{post?.title}</h1>
        <p>{post?.desc}</p>


      </div>
      <Menu />
    </div>
  )
}
