import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import "./App.css";
import CourseRegistration from "./pages/CourseRegistration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/CourseRegistration" element={<CourseRegistration />} />
    </Routes>
  );
}

export default App;
