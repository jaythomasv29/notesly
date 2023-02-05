import "./Write.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
const Write = () => {
  const [value, setValue] = useState("");
  return (
    <div className="new-post-container">
      <div className="content">
        <input type="text" placeholder="Title" />
        <div className="editor-container">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type="file" name="" id="file" />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="category-container">
            <input type="radio" name="category" value="art" id="art" />
            <label htmlFor="art">Art</label>
          </div>
          <div className="category-container">
            <input type="radio" name="category" value="science" id="science" />
            <label htmlFor="science">Science</label>
          </div>
          <div className="category-container">
            <input type="radio" name="category" value="technology" id="technology" />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="category-container">
            <input type="radio" name="category" value="cinema" id="cinema" />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="category-container">
            <input type="radio" name="category" value="design" id="design" />
            <label htmlFor="design">Design</label>
          </div>
          <div className="category-container">
            <input type="radio" name="category" value="food" id="food" />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write