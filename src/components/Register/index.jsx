import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.css";

const Register = () => {
  let [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let getFormInfo = (e) => {
    let myUser = { ...user }; //Depth copy
    myUser[e.target.name] = e.target.value; //value by tag name
    setUser(myUser);
  };

  let [formMiddleware, setFormMiddleware] = useState([]);

  let btnClick = async (e) => {
    e.preventDefault();
    let validateResult = validateForm();
    console.log(validateResult);
    if (validateResult.error) {
      setFormMiddleware(validateResult.error.details);
      return;
    }

    let { data } = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      user,
    );
    console.log(data);

    if (data.message == "success") {
      toast.success("Registered successfully, please Confirm your Email!");
    } else {
      toast.error(data.message);
    }
  };

  let validateForm = () => {
    const schema = Joi.object({
      userName: Joi.string().min(6).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).max(20).required(),
      cpassword: Joi.string()
        .min(6)
        .max(20)
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Passwords doesn't match",
        }),
    });
    return schema.validate(user);
  };

  return (
    <>
      <div className="d-flex justify-content-center pt-4">
        {formMiddleware?.map((error, index) => (
          <div key={index} className="alert alert-danger w-50">
            {error.message}
          </div>
        ))}
      </div>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="far fa-edit user-icon" />
          <h4 className="login">Register</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          <form onSubmit={btnClick} action="/handleLogin">
            <input
              onChange={getFormInfo}
              className="form-control"
              placeholder="Enter your Name"
              type="text"
              name="userName"
            />
            <input
              onChange={getFormInfo}
              className="form-control my-2 "
              placeholder="Enter your email"
              type="email"
              name="email"
            />
            <input
              onChange={getFormInfo}
              className="form-control  "
              placeholder="Enter your Password"
              type="password"
              name="password"
            />
            <input
              onChange={getFormInfo}
              className="form-control  my-2"
              placeholder="Password Confirmation"
              type="password"
              name="cpassword"
            />
            <button
              type="submit"
              className="btn btn-default-outline my-4 w-100 rounded"
            >
              Register
            </button>
            <Link className="btn btn-default-outline" to="/login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
