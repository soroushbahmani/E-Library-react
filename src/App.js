import './App.css';
import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import General from './components/General';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Ditails from './components/Ditails';
import AddBook from './components/AddBook';
import BookMe from './components/BookMe';
import Auth from './components/AuthContext';
import Profile from './components/Profile';
import axios from 'axios';
import ListBook from './components/ListBook';
import EditBook from './components/EditBook';
import ReadBook from './components/ReadBook';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditAboutUS from './components/EditAboutUs';
import EditContactUs from './components/EditContactUs';

axios.defaults.baseURL = 'http://library.erimo.ir';
function App() {

  return (
    <>
      <Auth.Provider value={{ token: false }}>
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/*" element={<General />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="editabout" element={<EditAboutUS />} />
          <Route path="editcontactus" element={<EditContactUs />} />
          
          <Route path="contactus" element={<ContactUs />} />
          <Route path="ditails/:id" element={<Ditails />} />
          <Route path="addbook" element={<AddBook />} />
          <Route path="editbook/:id" element={<EditBook />} />
          <Route path="listbook" element={<ListBook />} />
          <Route path="reading/:id" element={<ReadBook />} />
          <Route path="bookme" element={<BookMe />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Outlet />
      </Auth.Provider>
      <ToastContainer />

    </>
  );
}

export default App;
