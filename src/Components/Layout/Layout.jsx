import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({UserData,setUserData}) {
  const navigate= useNavigate();
  function logOut(){
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return <>
    <Navbar UserData={UserData} logOut={logOut}/>
    <div className="container-lg">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
