import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Modules from "./pages/Modules";
import GroupsList from "./pages/GroupList";
import Forum from "./pages/Forum";
import CreatePost from "./pages/CreatePost";
import StudyGroup from "./pages/StudyGroup";
import Calendar from  "./pages/Calendar"


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/group-list" element={<GroupsList />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/studyGroup" element={<StudyGroup />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
