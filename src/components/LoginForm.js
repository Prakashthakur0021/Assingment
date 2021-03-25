import React, { useState } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import Admin from './admin'
import User from "./User"

const LoginForm = () => {

  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);


  return (
    <>
    { user ? admin ? <Admin/> : <User/>: 

  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {

      const { email, password } = values;

      // Storing data in local Storage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      setUser(true);

      // Checking if user is Admin
      if(email == "task@gmail.com" && password == "12345678"){
        setAdmin(true);
      }

    }}

    // Handling validation for Input
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Invalid email address";
      }

      const passwordRegex = /(?=.*[0-9])/;
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be 8 characters long.";
      } else if (!passwordRegex.test(values.password)) {
        errors.password = "Invalida password. Must contain one number";
      }

      return errors;
    }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      localStorage.setItem('email', null);
      localStorage.setItem('password', null);
      return (
        <>
      
        <h1>LOGIN PORTAL</h1>
        <form onSubmit={handleSubmit}>

          {/* Form Input */}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}


          {/* Password input */}
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
        </>
      );
    }}
  </Formik>
}
  </>

)};

export default LoginForm;
