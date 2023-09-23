import React from "react";
import "./Auth.css";
import icon from "../../assets/icon.png";
import { useState } from "react";
import AboutAuth from "./AboutAuth.jsx";
import { signUp, logIn } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Auth() {
  const [isSignup, setIsSignup] = useState(false);

  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!email && !password){
      alert("Enter the credentials")
    }
    if(isSignup){
      if(!name){
        alert("please Enter Name to continue")
      }
      dispatch(signUp({name, email, password}, navigate))

    }else{
      dispatch(logIn({email,password}, navigate))
    }
  }

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && (
          <img src={icon} alt="stackoverflow-icon" className="login-logo" />
        )}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Name</h4>
              <input type="text" name="name" id="name" onChange={(e)=>{setName(e.target.value)}} />
            </label>
          )}

          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} />
          </label>

          <label htmlFor="password">
            <h4>Password</h4>
            <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />

            {!isSignup ? (
              <p style={{ color: "#007ac6", fontSize: "13px" }}>
                Forgot password?
              </p>
            ) : (
              <p style={{ color: "#666767", fontSize: "13px" }}>
                Password must be atleast eight
                <br /> characters, including atleast 1 letter
                <br /> and 1 character.
              </p>
            )}
          </label>

          {isSignup && (
            <label htmlFor="check">
              
                <input type="checkbox" id="check" />
                <p style={{ fontSize: "13px" }}>
                  Opt-in to recieve occasional, <br />
                  product updates, user research invitations, <br />
                  company announcements, and digests.
                </p>
            
            </label>
          )}

          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking "Sign up" you are agree to our <br />
              <span style={{ color: "#007ac6" }}> terms of service</span>,
              <span style={{ color: "#007ac6" }}> privacy policy </span>and
              <span style={{ color: "#007ac6" }}> cookies policy</span>.
            </p>
          )}
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}

          <button className="auth-pageswitch-btn" onClick={handleSwitch}>
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
