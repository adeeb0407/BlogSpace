import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { ImBlog } from "react-icons/im";

export class Navbar extends Component {
    render() {
        return (
            <div>
<nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark py-0 navGeneral">
  <div className="container-fluid">
    <Link className="navbar-brand navHeadingFont mx-4" to="/"><ImBlog /> BlogSpace</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">

      <ul className="navbar-nav mx-5">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/writeblog">Write a Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/publishblog">Published Blogs</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Check Your Blogs
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">Most Viewed Blogs</a></li>
            <li><a className="dropdown-item" href="#">Drafted Blogs</a></li>
            <li><a className="dropdown-item" href="#">Deleted Blogs</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
            </div>
        )
    }
}

export default Navbar
