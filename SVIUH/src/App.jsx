import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";
import Subject from "./pages/Subject";
import Grades from "./pages/Grades";
import AppLayout from "./components/AppLayout"; // thêm layout chính

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/subject" element={<Subject />} />
                <Route path="/grades" element={<Grades />} />
                {/* Thêm các routes khác tại đây */}
              </Routes>
            </AppLayout>
          }
        />
      </Routes>

      {/* ToastContainer dùng chung toàn ứng dụng */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
