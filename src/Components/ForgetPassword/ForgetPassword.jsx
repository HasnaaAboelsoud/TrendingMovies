import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"

export default function ForgetPassword() {
    const [code,setcode]= useState(true);
    const navigate= useNavigate();
    const validationSchema= Yup.object({
        email: Yup.string().required("Email is requried").email("Email is invalid")
    })
    const formik1= useFormik({
        initialValues:{
            email:"",
        },
        validationSchema,
        onSubmit:ForgetPasswordFun,
    })
    async function ForgetPasswordFun(values){
        try {
            const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values);
            if(data.statusMsg === "success"){
                toast.success(data.message);
                setcode(false);
            }
        } catch (error) {
            console.log(error);
        }

    }
    
    const formik2=useFormik({
        initialValues:{
            resetCode:"",
        },
        onSubmit: ResetCode,
    })
    async function ResetCode(values){
        try {
            const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values);
            toast(data.status,{className:"bg-info h6 p-1 text-white"});
            navigate("/resetpassword");
        } catch (error) {
            toast.error(error.response.data.message,{className:"bg-danger h6 p-1 text-white"});
        }

    }
    return  <>
        {!code?<form onSubmit={formik2.handleSubmit} className='w-75 mx-auto'>
    <Helmet>
        <title>Reset Password</title>
    </Helmet>
    <div className='px-0 px-md-5 my-5 pt-4 pb-5'>
        <label htmlFor='resetCode'>Reset Code</label>
        <input type="text" onChange={formik2.handleChange} name="resetCode" id="resetCode" className='form-control p-1 mb-2'></input>
        {formik2.errors.email ? <p className='alert alert-danger p-1'>{formik2.errors.email}</p> : ""}
        <button className='btn mb-5 btn-info' type="submit">Verify Code</button>
    </div>
</form>: <div className="my-5 pt-4 pb-5">
<Helmet>
    <title>Forget Password</title>
</Helmet>
<h2 className="h5 fw-bolder text-center">Forget Password !</h2>
<form onSubmit={formik1.handleSubmit} className='w-75 mx-auto'>
    <div className="w-75 mx-auto px-0 px-md-5">
        <label htmlFor="email">Email</label>
        <input type="email" onChange={formik1.handleChange} name="email" id="email" className="form-control p-1 mb-2"></input>
        {formik1.errors.email ? (
            <p className="alert alert-danger p-1">{formik1.errors.email}</p>
        ) : ("")}
        <button className="btn mb-5 btn-info mt-2" type='submit'>Send email</button>
    </div>
</form>
</div>}
        </>
}
