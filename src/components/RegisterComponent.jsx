import React, { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI';
import { postUserData } from '../api/FirestoreAPI';
import LinkedinLogo from "../assests/linkedinlogo.png";
import GoogleButton from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import "../Sass/LoginComponent.scss";
import { toast } from 'react-toastify';
import { getUniqueID } from '../helpers/getUniqueid';

export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentails] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      toast.success("Account Created!");
      postUserData({ userID: getUniqueID() ,name: credentails.name, email: credentails.email })
      navigate('/home');
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
  }
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />
      <div className="login-wrapper-inner">
      <h1 className='heading'>Make the most of your professional life</h1>
  
      <div className="auth-inputs">
        <input
          onChange={(event) =>
            setCredentails({ ...credentails, name: event.target.value})
          }
            type="name"
            className="common-input"
            placeholder="Your Name"
        />
        <input
          onChange={(event) =>
            setCredentails({ ...credentails, email: event.target.value})
          }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
        />
        <input
          onChange={(event) => 
            setCredentails({ ...credentails, password: event.target.value})
          }
            type="password"
            className="common-input"
            placeholder="Password"
        />
      </div>
      <button onClick={register} className="login-btn">Agree & Join</button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton
         className="google-btn"
         onClick={googleSignIn}
        />

        <p className="go-to-signup">
          Already on LinkedIn?{" "}  
          <span className='join-now' onClick={() => navigate("/")} >
             Sign in</span>
        </p>
      </div>
    </div>
  );
}
