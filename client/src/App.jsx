import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation.jsx';
import HomePage from './HomePage';
import { AuthProvider } from "./components/auth/AuthContext";
import "./App.css";
import Footer from "./components/common/Footer.jsx";
import BlogList from "./components/blog/BlogList.jsx";
import Blog from "./components/blog/Blog.jsx";
import Team from "./Team.jsx";
import Register from './components/auth/Register';
import Login from "./components/auth/Login.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import Courses from "./components/courses/Courses.jsx";
import CourseDetails from "./components/courses/CourseDetails.jsx";
import MyCourses from "./components/courses/MyCourses.jsx";
import CourseContent from './components/courses/CourseContent';
import CoursePlayer from './components/courses/CoursePlayer';
import Success from "./components/auth/Success.jsx";
import Cancel from "./components/auth/Cancel.jsx";
import Loading from "./components/common/loading.jsx";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
  };

  return (
    <AuthProvider>
      <Router>
        <div>
        {/* <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} /> */}
       <Routes>
       <Route path="/" element={<HomePage />} />
       <Route path="/blogs" element={<PrivateRoute element={<BlogList />} />} />
       <Route path="/blog/:blogId" element={<PrivateRoute element={<Blog />} />} />
       <Route path="/team" element={<Team />} />
       <Route path="/register" element={<Register onLogin={handleLogin} />} /> 
       <Route path="/login" element={<Login onLogin={handleLogin} />} />
       <Route path="/courses" element={<Courses />} />
       <Route path="/course-details/:id" element={<CourseDetails />} />
       <Route path="/my-courses" element={<PrivateRoute element={<MyCourses />} />} />
       <Route path="/start-course/:id" element={<PrivateRoute element={<CourseContent />} />} />
       <Route path="/course-player/:courseId" element={<PrivateRoute element={<CoursePlayer />} />} />
       <Route path="/success" element={<Success />} />
       <Route path="/cancel" element={<Cancel />} />
      <Route path="/loading" element={<Loading />} />

       </Routes>
       {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
