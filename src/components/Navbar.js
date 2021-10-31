import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { ImBlog } from "react-icons/im";
import firebase from '../firebase'
import { withRouter, Redirect, useHistory } from "react-router";
import { AuthContext } from "./Auth.js";

    
function Navbar() {
  const history = useHistory()
      const signOut = () => {
        firebase.auth().signOut()
          history.push('/login')
      }
const { currentUser, navShow, setNavShow } = useContext(AuthContext);
      return (

        <div>
<nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark py-0 navGeneral">
  <div className="container-fluid">
    <Link className="navbar-brand navHeadingFont mx-4" to="/"><ImBlog /> BlogSpace</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {navShow ?
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul className="navbar-nav mx-5">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item"></li>
                    <li className="nav-item">
          <Link className="nav-link" to="/writeblog">Write a Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/publishblog">Published Blogs</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Profile
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li className="dropdown-item" style = {{padding : '5px', cursor : 'pointer', fontSize : '20px', fontWeight : 'bold', paddingLeft : '15px'}} onClick={signOut}> Sign out</li>
            <li><a className="dropdown-item" href="#">Drafted Blogs</a></li>
            <li><a className="dropdown-item" href="#">Deleted Blogs</a></li>
          </ul>
        </li>
        </ul>
    </div>: ''}
  </div>
</nav>
            </div>
      )
    }

export default Navbar
