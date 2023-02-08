import React, { useState } from "react"
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom"
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Menu from "../components/Menu/Menu";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./Post.scss";
import 'react-quill/dist/quill.snow.css';


export const Post = () => {

 const modules = {toolbar: false};
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const [post, setPost] = useState({});


  const handleDeletePost = async (id) => {
    await axios.delete(`/posts/${id}`)
    navigate("/");
    
  }

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
        <img src={`../uploads/${post.post_img}`} />
        <div className="user">
          <img src={post?.user_img || "https://images.pexels.com/photos/12509454/pexels-photo-12509454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} />
          <div className="info">
            <span>{post?.email}</span>
            <p>Posted {moment(post?.date).startOf("hour").fromNow()}</p>
          </div>
          {
            currentUser?.email === post?.email &&
            <div className="controls">
              <div className="circle edit">
                <Link className="link" to={`/write?edit=${post.id}`} state={post}>
                  <ModeEditIcon />
                </Link>

              </div>
              <div className="circle delete">
                
                  <HighlightOffIcon onClick={() => handleDeletePost(post.id)}/>
                
              </div>
            </div>
          }
        </div>
        <h1>{post?.title}</h1>
        <ReactQuill value={post?.desc} modules={modules} />


      </div>
      <Menu category={post.category} ignoreId={post.id}/>
    </div>
  )
}
