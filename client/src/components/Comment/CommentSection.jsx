import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import CommentForm from "./CommentForm"
import CommentBox from './CommentBox';
import "./CommentSection.scss"

const CommentSection = ({ pid }) => {
  const [comments, setComments] = useState([]);

  const getCommentsByPostId = async () => {
    const response = await axios.get(`/posts/${pid}/comments`);
    console.log("Get Comments");
    setComments(response.data);
  }

  useEffect(() => {
    getCommentsByPostId();
  }, [pid])
  return (
    <div className="comments-container">
      <div className="comments-section">
        <CommentForm pid={pid} setComments={setComments} comments={comments} />
        {
          !comments.length ? "No comments yet" :
            <>
              {
                comments.map(comment => (
                  <CommentBox key={comment?.id} comment={comment} />
                ))
              }
            </>
        }
      </div>
    </div>
  )
}

export default CommentSection