import React, { Component } from 'react'
import './styles/footer.css';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineGithub } from 'react-icons/ai';
import { AiFillYoutube } from 'react-icons/ai';
export class Footer extends Component {
    constructor(){
        super()
        const today = new Date();
        let year = today.getFullYear();
    }
    render() {
        return (
            <footer className = 'bg-dark'>
            <h3>Copyright &copy;</h3>  
            <br />
            <div class="wrapper">
  <div class="icon facebook">
    <div class="tooltip">Linkdin</div>
    <a href="https://www.linkedin.com/in/adeebdev/" target = '_blank'>
    <span><AiFillLinkedin /></span>
    </a>
  </div>
  <div class="icon twitter">
    <div class="tooltip">Twitter</div>
    <a href="https://twitter.com/adeebshah41" target = '_blank'>
    <span><FaTwitter /></span>
    </a>
  </div>
  <div class="icon instagram">
    <div class="tooltip">Instagram</div>
    <a href="https://www.instagram.com/adeeb0407/" target = '_blank'>
    <span><FaInstagram /></span>
    </a>
  </div>
  <div class="icon github">
    <div class="tooltip">Github</div>
    <a href="https://github.com/adeeb0407" target = '_blank'>
    <span><AiOutlineGithub /></span>
    </a>
  </div>
  <div class="icon youtube">
    <div class="tooltip">Youtube</div>
    <a href="https://www.youtube.com/channel/UCWnjwzTa7Lo-EuPAqO6lHcQ" target = '_blank'>
    <span><AiFillYoutube/></span>
    </a>
  </div>
</div>
            <p>Website By : Adeeb Shah</p>  
            </footer>
        )
    }
}

export default Footer
