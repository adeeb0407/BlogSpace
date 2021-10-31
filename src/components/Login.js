import React, { useCallback, useState, useContext, useRef } from "react";
import { withRouter, Redirect } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import firebase from "../firebase";
import { ImPencil2, ImGooglePlus } from "react-icons/im";
import { AuthContext } from "./Auth.js";
import './styles/auth.css';


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push("/", 	toast.success('Successfully Logged In', {
			position: "bottom-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			}));
      } catch (error) {
		toast.error('Email or Password is Incorrect', {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
      }
    },
    [history]
  );
  const [login, setLoggedIn] = useState('login')
  const switchToAuth = useRef(null);
  
  const { currentUser, navShow, setNavShow } = useContext(AuthContext);

  let switchToSignUp = () => {
	const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');
	const container = document.getElementById('container');
	history.push('/signup')
	container.classList.add("right-panel-active");
  }
  let switchToSignIn = () => {
	const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');
	const container = document.getElementById('container');


	container.classList.remove("right-panel-active");
  }

  if (currentUser) {
	setNavShow(true)
    return (
	<Redirect to="/" />
	);
  }

  return (
    <div className = {login} ref = {switchToAuth}>
	<ToastContainer />
<div className="container-login" id="container" ref = {switchToAuth}>
	<div className="form-container sign-in-container">
		<form onSubmit={handleLogin} className = 'loginFrom'>
			<h1 className = 'loginHeading' style = {{color : '#3C3E3E'}}>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><ImGooglePlus style = {{color : '#3C3E3E'}}/></a>
				<a href="#" className="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span className = 'loginExtraInfo' style = {{color : '#3C3E3E'}}>or use your account</span>
			<input name="email" type="email" placeholder="Email" />
			<input name="password" type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button type="submit" className = 'login-button'>Log in</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right" >
				<h1 className = 'loginHeading'>Hello, Blogger!</h1>
				<br />
				<h1 className = 'loginHeading'><ImPencil2 /></h1>
				<p className="loginIngo">Enter your personal details and start journey with us</p>
				<button className="login-button ghost" id="signUp" onClick = {switchToSignUp}>Sign Up</button>
			</div>
		</div>
	</div>
</div>
</div>
	
  );
};

export default withRouter(Login);
