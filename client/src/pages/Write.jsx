import "./Write.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UploadIcon from '@mui/icons-material/Upload';
const Write = () => {
  const location = useLocation();
  const state = location.state;
  console.log(location);
  console.log(state);

  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [title, setTitle] = useState(state?.title || "");
  const [category, setCategory] = useState(state?.category || "");
  const [uploadImg, setUploadImg] = useState(state?.post_img || null);
  const [value, setValue] = useState(state?.desc || "");

  const resetFields = () => {
    setTitle("")
    setCategory("")
    setUploadImg(null)
    setValue("")

  }

  useEffect(() => {
    if (!location.search) {
      resetFields();
    }

  }, [location])
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!title || !value || !category || !uploadImg) {
      setError("Error: All fields are required")
      setTimeout(() => {
        setError("")
      }, 3000)
      return
    }
    const imgUrl = await uploadImage();

    try {
      let response = null;
      state ?
        response = await axios.put(`/posts/edit/${state.id}`, {
          title,
          category,
          desc: value,
          img: uploadImage ? imgUrl : ""
        })
        :
        response = await axios.post("/posts/add", {
          title,
          category,
          desc: value,
          img: uploadImage ? imgUrl : (state.post_img || "")
        })
      console.log(response);
      navigate("/");

    } catch (err) {
      console.log(err);
    }
  }

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", uploadImg)
      const response = await axios.post("./upload", formData)
      return response.data;

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1 className="post">{state ? "Edit a Post" : "Create a Post"}</h1>
      <div className="new-post-container">
        <div className="content">
          {
            error &&
            <span className="error-msg">{error}</span>
          }
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <div className="editor-container">
            <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status: </b> Active
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <input onChange={e => setUploadImg(e.target.files[0])} style={{ display: "none" }} type="file" name="" id="file" required />
            <label className="file" htmlFor="file"> <span><UploadIcon /> Upload Image</span>

            </label>
            {
              state?.post_img && state?.post_img
            }

            <div className="buttons">
              {/* <button>Save as a draft</button> */}
              <button onClick={handleSubmitPost}>Publish</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="category-container">
              <input onChange={e => setCategory(e.target.value)} checked={category.toLowerCase() === "art"} type="radio" name="category" value="art" id="art" />
              <label htmlFor="art">Art</label>
            </div>
            <div className="category-container">
              <input onChange={e => setCategory(e.target.value)} checked={category.toLowerCase() === "science"} type="radio" name="category" value="science" id="science" />
              <label htmlFor="science">Science</label>
            </div>
            <div className="category-container">
              <input onChange={e => setCategory(e.target.value)} checked={category.toLowerCase() === "technology"} type="radio" name="category" value="technology" id="technology" />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="category-container">
              <input onChange={e => setCategory(e.target.value)} checked={category.toLowerCase() === "cinema"} type="radio" name="category" value="cinema" id="cinema" />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="category-container">
              <input onChange={e => setCategory(e.target.value)} checked={category.toLowerCase() === "design"} type="radio" name="category" value="design" id="design" />
              <label htmlFor="design">Design</label>
            </div>
            <div className="category-container">
              <input onChange={e => setCategory(e.target.value)} checked={category.toLowerCase() === "food"} type="radio" name="category" value="food" id="food" />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Write