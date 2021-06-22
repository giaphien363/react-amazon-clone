import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import "./login.css";
import { useState } from "react";
import { auth } from "../firebase";
import { useStateValue } from "../provider/StateProvider";

const Login = () => {
  const history = useHistory();
  const [state, dispatch] = useStateValue();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

 

  const changeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formValue);
    if (formValue.email && formValue.password) {
      auth
        .signInWithEmailAndPassword(formValue.email, formValue.password)
        .then((auth) => {
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const register = (e) => {
    e.preventDefault();
    if (formValue.email && formValue.password) {
      auth
        .createUserWithEmailAndPassword(formValue.email, formValue.password)
        .then((auth) => {
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
          alt=""
          className="login_logo"
        />
      </Link>
      <div className="login_container">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <h5>E-mail</h5>
          <input
            type="email"
            value={formValue.email}
            name="email"
            onChange={changeValue}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={formValue.password}
            name="password"
            onChange={changeValue}
          />
          <button className="login_signInButton">Sign in</button>
        </form>

        <p>
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login_signUpButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
