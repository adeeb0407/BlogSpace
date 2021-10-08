import React, { Component } from 'react'
import './styles/home.css'
import {home} from './Data'
import {Link} from 'react-router-dom'
import { FaPenNib } from "react-icons/fa";

export class Home extends Component {
    render() {
        return (
            <div className = 'my-5 homePage'>
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
}

export default Home
