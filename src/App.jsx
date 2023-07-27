import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { Toaster } from 'react-hot-toast'
import ResetPassword from './Components/ResetPassword/ResetPassword';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import MediaDetails from './Components/MediaDetails/MediaDetails';


function App() {
  const [UserData,setUserData] = useState(null)
  function saveUserData(){
    const encoded= localStorage.getItem("userToken");
    const decoded=jwtDecode(encoded);
    setUserData(decoded);
  }
  useEffect(()=>{
    if(localStorage.getItem("userToken") != null){
      saveUserData();
    }
  },[])
  let routers = createHashRouter([
    { path: "", element: <Layout UserData={UserData} setUserData={setUserData}/> , children: [
      {index:true , element:<Home/>},
      {path:"/movies" , element:<ProtectedRoute><Movies/></ProtectedRoute>},
      {path:"/tvShow" , element:<ProtectedRoute><Tvshow/></ProtectedRoute>},
      {path:"/people" , element: <ProtectedRoute><People/></ProtectedRoute>},
      {path:"/mediaDetails/:id/:mediaType" , element: <ProtectedRoute><MediaDetails/></ProtectedRoute>},
      {path:"/login" , element: <Login saveUserData={saveUserData}/>},
      {path:"/forgetpassword" , element: <ForgetPassword/>},
      {path:"/resetpassword" , element: <ResetPassword/>},
      {path:"/register" , element:<Register/>},
      {path:"*" , element: <Notfound/>},
    ]}
  ])

  return <>
    <Toaster/>
    <RouterProvider router={routers}></RouterProvider>
  </>
}

export default App;
