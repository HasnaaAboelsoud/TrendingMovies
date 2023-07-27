import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"

export default function Register() {
  let [apiError,setError]=useState("");
  let [loading,setLoading]=useState(false);
  let navigate= useNavigate();
  let validate= Yup.object({
    name: Yup.string().required("name is required").min(3,"min char is 3").max(15,"15 is max char"),
    email: Yup.string().required("email is required").email("email not valid"),
    password: Yup.string().required("password is required").matches(/^[A-Za-z]{3,}[0-9]{2,5}$/,"Password must contain at least 3 characters and 2 numbers"),
    rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")],"repassword not match"),
    phone: Yup.string().required("phone is required").matches(/^01[0-25][0-9]{8}$/,"phone is not egyption"),
  })
  let formik= useFormik({
    initialValues:{
      name:"",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: setData,
    validationSchema: validate,
  });
  async function setData(values){
    setLoading(true);
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).catch((err)=>{
        setError(err.response.data.message);
        setLoading(false);
        
    })
    if(data.message === "success"){
      navigate("/login");
      toast("success",{className:"bg-info text-white py-1 h6"});
      setLoading(false);
    }
  }
  return (
    <div className='w-75 mx-auto'> 
    <Helmet>
      <title>Register Page</title>
    </Helmet>
      <h3>Register Now</h3>
      <form onSubmit={formik.handleSubmit}>
        {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
        <label htmlFor='name'>name</label>
        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" id="name" className='form-control my-2'></input>
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger p-1'>{formik.errors.name}</div>:""}

        <label htmlFor='email'>email</label>
        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" id="email" className='form-control my-2'></input>
        {formik.errors.email && formik.touched.name?<div className='alert alert-danger p-1'>{formik.errors.email}</div>:""}

        <label htmlFor='password'>password</label>
        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" id="password" className='form-control my-2'></input>
        {formik.errors.password && formik.touched.name?<div className='alert alert-danger p-1'>{formik.errors.password}</div>:""}


        <label htmlFor='rePassword'>rePassword</label>
        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" id="rePassword" className='form-control my-2'></input>
        {formik.errors.rePassword && formik.touched.name?<div className='alert alert-danger p-1'>{formik.errors.rePassword}</div>:""}

        <label htmlFor='phone'>phone</label>
        <input type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" id="phone" className='form-control my-2'></input>
        {formik.errors.phone && formik.touched.name?<div className='alert alert-danger p-1'>{formik.errors.phone}</div>:""}
        <p className='text-center mt-3'>Already a member? <Link to="/login" className='text-decoration-none'> Log In</Link></p>
        <button className='btn btn-info'>{loading?<i className='fas fa-spinner fs-spin'></i>:"Register"}</button>
      </form>
    </div>
  )
}
