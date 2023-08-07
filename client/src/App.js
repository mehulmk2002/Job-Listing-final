import React from 'react'
import Home from './components/Home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddJob from './components/AddJob/AddJob'
import './App.css'
import JobDetails from './components/Home/JobDetails'
import EditJob from './components/EditJob/EditJob'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addJob' element={<AddJob/>} />
      <Route path="/JobDetail/:id" element={<JobDetails />} />
      <Route path="/editJob/:id" element={<EditJob />} />
      <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
    </Routes>
    
    </BrowserRouter>
    </div>
  )
}

export default App 