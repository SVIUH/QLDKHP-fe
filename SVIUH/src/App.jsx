import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
