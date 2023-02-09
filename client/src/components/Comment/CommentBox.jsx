import React from 'react'
import ReactQuill from "react-quill";
import moment from "moment"
import "./CommentBox.scss"

const CommentBox = ({ comment }) => {
  const modules = { toolbar: false };
  return (
    <div className="comment-card">
      <ReactQuill value={comment.comment} modules={modules} />
      <p className="author">by: {comment?.username} {moment(comment?.date).startOf("minute").fromNow()}</p>
    </div>
  )
}

export default CommentBox