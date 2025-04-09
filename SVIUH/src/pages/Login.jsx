import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kiểm tra đăng nhập (ví dụ đơn giản)
    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/home");
    } else {
      alert("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center w-3/4 max-w-4xl">
        {/* Form đăng nhập */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
            Đăng Nhập
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-full mt-1"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Mật khẩu</label>
              <input
                type="password"
                className="w-full p-3 border rounded-full mt-1"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-4 text-center">
            Quên mật khẩu? <a href="#" className="text-purple-600">Khôi phục</a>
          </p>
          <p className="text-gray-600 text-sm mt-4 text-center">
            Chưa có tài khoản? <a href="#" className="text-purple-600">Đăng ký</a>
          </p>
        </div>

        {/* Hình ảnh minh họa */}
        <div className="w-1/2 hidden md:flex justify-center">
          <img
            src="/loginBG.png"
            alt="Login Illustration"
            className="w-3/4"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;