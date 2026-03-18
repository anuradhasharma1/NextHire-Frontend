import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import MyApplications from './pages/MyApplications';
import './App.css'



function App() {


  return (
    <>
      <div className='min-h-screen bg-[#1B1212]'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/post-job" element={
            <ProtectedRoute role="company">
              <PostJob />
            </ProtectedRoute>
          } />
          <Route path="/my-applications" element={
            <ProtectedRoute role="candidate">
              <MyApplications />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App;
