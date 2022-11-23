import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import cookie from 'react-cookies';

const Login = () => {
  let [user, setUser] = useState({
    email: '',
    password: ''
  })

  let [errorList, setErrorList] = useState([]);




  async function submitFormData(e) {
    e.preventDefault();
    let validateResult = valideteForm();
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
    } else {
      let { data } = await axios.post("http://localhost:3000/api/v1/auth/signIn", user);
      if (data.message != "done") {
        const e={
          message:`${data.message}`
        }
        // console.log(data.message)
        setErrorList([e]);
        console.log(errorList);
      } else {
        cookie.save('tooken', data.loginToken, { path: "/" });
        goToHome();
      }
    }



  }

  function valideteForm() {
    const schema = Joi.object({
      email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  function getFormValue(e) {
    setUser({ ...user, [e.target.name]: e.target.value });

  }


  let Navigate = useNavigate();
  function goToHome() {
    let path = "/home";
    Navigate(path);
  }


  return <>
    <div>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="fas fa-user-secret user-icon" />
          <h4 className="login">Login</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          {errorList.map((error, index) => <div key={index} className="alert alert-danger">
            {error.message}
          </div>)}
          <form onSubmit={submitFormData}>
            <input onChange={getFormValue} className="form-control" placeholder="Enter your email" type="text" name="email" />
            <input onChange={getFormValue} className="form-control my-4 " placeholder="Enter your Password" type="text" name="password" />
            <button className="btn btn-default-outline my-4 w-100 rounded" type="submit">Login</button>
            <p><a className="text-muted forgot btn" href="">I Forgot My Password</a></p>
            <Link className="btn btn-default-outline" to="register">Register</Link>
          </form>
        </div>
      </div>
    </div>
  </>

};

export default Login;
