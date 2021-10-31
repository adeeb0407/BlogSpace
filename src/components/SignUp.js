import React, { useCallback, useState, useRef } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import { RiPenNibLine } from "react-icons/ri";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, confirmPassword } = event.target.elements;
    console.log(email, password.value, confirmPassword.value)
    try {
      if(confirmPassword.value == password.value){
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/", toast.success('Successfully Signed Up', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }));
      }else{
        toast.error(`Password dont Match`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });;
    }
  }, [history]);

  let switchToSignIn = () => {
    history.push("/login");
  }



  return (
      <div className = 'login right-panel-active'>
      <ToastContainer />
<div className="container-login right-panel-active" id="container" >
	<div className="form-container sign-up-container right-panel-active">
		<form className = 'loginFrom' onSubmit={handleSignUp}>
			<h1 className = 'loginHeading' style = {{color : '#3C3E3E'}}>Create Account</h1>
			<div class="social-container">
			</div>
			<span className = 'loginExtraInfo' style = {{color : '#3C3E3E'}}>or use your email for registration</span>
			<input type="text" placeholder="Name"  autoComplete = 'true'/>

      <input name="email" type="email" placeholder="Email" autoComplete = 'true' />
			<input name="password" type="password" placeholder="Password"  autoComplete = 'true'/>
			<input name="confirmPassword" type="password" placeholder="Confirm Password"  autoComplete = 'true'/>
			<button className = 'login-button' type="submit" >Sign Up</button>
		</form>
	</div>
	<div className="overlay-container right-panel-active">
		<div className="overlay right-panel-active">
			<div className="overlay-panel overlay-left right-panel-active">
				<h1 className = 'loginHeading'>Welcome Back!</h1>
        <br />
				<h1 className = 'loginHeading'><RiPenNibLine /></h1>
				<p className="loginIngo">To keep connected with us please login with your personal info</p>
				<button className="login-button ghost" id="signIn" onClick = {switchToSignIn}>Sign In</button>
			</div>
		</div>
	</div>
</div>
</div>
  );
};

export default withRouter(SignUp);
