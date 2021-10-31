import React, { useContext } from 'react'
import './styles/home.css'
import {home} from './Data'
import {Link} from 'react-router-dom'
import { FaPenNib } from "react-icons/fa";
import { AuthContext } from "./Auth.js";
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    
    const { currentUser, navShow, setNavShow } = useContext(AuthContext);
    setNavShow(true)
    return (
            <div className = 'my-5 homePage'>
            <ToastContainer />
                <h1 className = 'heading'>{home.heading}</h1>
                <p className = 'introduction' id = 'start'>{home.introduction}</p>
                <div className = 'buttonAligniment'>
                <Link to = '/writeblog'>
                <button  className="noselect buttonStyle"><span class='text' style = {{transform: 'translateX(25px)'}}>Write a Blog</span><span class="icon"><FaPenNib /></span></button>
                </Link>
                </div>
            </div>
    )
}

export default Home
