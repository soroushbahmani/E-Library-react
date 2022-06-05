import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import General from './components/General';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Ditails from './components/Ditails';
import AddBook from './components/AddBook';
import BookMe from './components/BookMe';
import Auth from './components/AuthContext';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import ListBook from './components/ListBook';
import EditBook from './components/EditBook';




axios.defaults.baseURL = 'http://library.erimo.ir';


function App() {
  // useEffect(()=>{

  //     toast('به کتابخانه الکترونیکی خوش آمدید',{
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       });
  // },[])

  return (
    <div>

      <Auth.Provider value={{ token: false }}>

        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/*" element={<General />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="ditails/:id" element={<Ditails />} />
          <Route path="addbook" element={<AddBook />} />
          <Route path="editbook/:id" element={<EditBook />} />
          <Route path="listbook" element={<ListBook />} />
          
          <Route path="bookme" element={<BookMe />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Outlet />
      </Auth.Provider>
      <ToastContainer />



    </div>
  );
}

export default App;
