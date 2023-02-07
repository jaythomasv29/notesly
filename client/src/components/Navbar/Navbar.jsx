import "./Navbar.scss"
import Logo from "../../img/logo.png"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"


export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img className="logo" src={Logo} alt="blog-logo" />
        </div>
        <div className="links">
          <Link className="link" to="/"><h6>Home</h6></Link>
          <Link className="link" to="/?cat=art"><h6>Art</h6></Link>
          <Link className="link" to="/?cat=science"><h6>Science</h6></Link>
          <Link className="link" to="/?cat=technology"><h6>Technology</h6></Link>
          <Link className="link" to="/?cat=cinema"><h6>Cinema</h6></Link>
          <Link className="link" to="/?cat=design"><h6>Design</h6></Link>
          <Link className="link" to="/?cat=food"><h6>Food</h6></Link>
          <span>{currentUser?.email}</span>
          {
            currentUser ?
            <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>
          }
          <span className="write-btn">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
