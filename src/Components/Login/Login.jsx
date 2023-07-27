import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Login({saveUserData}) {
  let [apiError,setError]=useState("");
  let [loading,setLoading]=useState(false);
  let navigate= useNavigate();
  let validate= Yup.object({
    email: Yup.string().required("email is required").email("email not valid"),
    password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/,"must start with capital"),
  })
  let formik= useFormik({
    initialValues:{
      email: "",
      password: "",
    },
    onSubmit: setData,
    validationSchema: validate,
  });
  async function setData(values){
    setLoading(true);
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((err)=>{
        setError(err.response.data.message);
        setLoading(false);
        
    })
    if(data.message === "success"){
      localStorage.setItem("userToken",data.token);
      saveUserData();
      navigate("/");
      toast("success",{className:"bg-info text-white py-1 h6"});
      setError("");
      setLoading(false);
    }
  }
  return (
    <div className='w-75 pb-5 mx-auto'> 
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <h3>Login Now</h3>
      <form onSubmit={formik.handleSubmit}>
        {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
  
        <label htmlFor='email'>email</label>
        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className='form-control my-2'></input>
        {formik.errors.email && formik.touched.name?<div className='alert alert-danger'>{formik.errors.email}</div>:""}

        <label htmlFor='password'>password</label>
        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className='form-control my-2'></input>
        {formik.errors.password && formik.touched.name?<div className='alert alert-danger'>{formik.errors.password}</div>:""}
      
        <button className='btn btn-info mt-3 w-100' type="submit">{loading?<i className='fas fa-spinner fs-spin'></i>:"login"}</button>
        <Link to="/forgetpassword" className='d-block mt-2 text-center'>forget a password?</Link>
        <p className='text-center mt-2'>Not a member yet? <Link to="/register" className='text-decoration-none'>Create Account</Link></p>
      </form>
    </div>
  )
}