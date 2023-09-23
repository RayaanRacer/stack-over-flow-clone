import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home.jsx'
import Auth from './pages/auth/Auth.jsx'
import Questions from './pages/questions/Questions.jsx';
import AskQuestion from './pages/askQuestion/AskQuestion.jsx';
import DisplayQuestion from './pages/questions/DisplayQuestion.jsx';
import Tags from './pages/tags/Tags.jsx';
import Users from './pages/users/Users.jsx';
import UserProfile from './pages/userProfile/UserProfile.jsx';
function AllRoutes() {
  return (
    <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/Auth' element={<Auth/>}/>
        <Route path = '/Questions' element ={<Questions/>}/>
        <Route path = '/AskQuestion' element={<AskQuestion/>}/>
        <Route path = '/Questions/:id' element={<DisplayQuestion/>}/>
        <Route path = '/Tags' element = {<Tags/>}/>
        <Route path = '/Users' element = {<Users/>}/>
        <Route path = '/Users/:id' element = {<UserProfile/>}/>
    </Routes>
  )
}

export default AllRoutes