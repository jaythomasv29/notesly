import axios from "axios";
import React, { useState } from "react"
import { useContext } from "react";
import ReactQuill from "react-quill";
import { AuthContext } from "../../context/authContext";
import "./Comment.scss"

const Comment = ({ pid, comments, setComments }) => {
  const [commentValue, setCommentValue] = useState("")
  const { currentUser } = useContext(AuthContext);

  const getCommentsByPostId = async () => {
    const response = await axios.get(`/posts/${pid}/comments`);
    console.log("Get Comments");
    setComments(response.data);
  }

  const submitComment = async () => {
    const insertId = await axios.post(`/posts/add/${pid}/comment`, {
      pid,
      uid: currentUser.id,
      comment: commentValue
    })
    console.log(insertId);

    // const response = await axios.get(`/posts/comments/${insertId}`)
    await getCommentsByPostId()
    setCommentValue("");
  }

  return (
    <div className="comment-container">
      {currentUser ?
        <>
          <ReactQuill className="editor" theme="snow" value={commentValue} onChange={setCommentValue} placeholder="What are your thoughts?" />
          <button onClick={submitComment} className="comment-btn">Post</button>
        </>
        :
        <p>Login or register to post</p>
      }
    </div>
  )
}

export default Comment