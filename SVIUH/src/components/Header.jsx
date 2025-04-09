import { useState } from "react";
import { 
  FaBell, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaFileAlt, 
  FaSearch, 
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xử lý đăng xuất
    localStorage.removeItem('studentToken');
    navigate('/login');
  };

  const icons = [
    { 
      Icon: FaBell, 
      name: 'notifications', 
      label: "Thông báo",
      count: 5,
      dropdownContent: [
        { title: "Lịch học mới", content: "Lịch học kỳ mới đã được cập nhật", time: "10 phút trước" },
        { title: "Học phí", content: "Hạn đóng học phí HK2 đến 30/11", time: "1 giờ trước" },
        { title: "Thông báo điểm", content: "Điểm môn Cơ sở dữ liệu đã có", time: "2 ngày trước" }
      ]
    },
    { 
      Icon: FaCalendarAlt, 
      name: 'calendar', 
      label: "Lịch học",
      count: 0,
      dropdownContent: [
        { title: "Hôm nay", content: "Nhập môn AI - P501 - 7:30-9:30", time: "" },
        { title: "Ngày mai", content: "Toán rời rạc - P302 - 9:30-11:30", time: "" }
      ]
    },
    { 
      Icon: FaEnvelope, 
      name: 'messages', 
      label: "Tin nhắn",
      count: 3,
      dropdownContent: [
        { title: "Phòng đào tạo", content: "Vui lòng nộp bản sao bằng tốt nghiệp", time: "2 ngày trước" },
        { title: "Giảng viên", content: "Thông báo lịch thi cuối kỳ", time: "1 tuần trước" }
      ]
    },
    { 
      Icon: FaFileAlt, 
      name: 'documents', 
      label: "Tài liệu",
      count: 2,
      dropdownContent: [
        { title: "Slide bài giảng", content: "Môn Kiến trúc máy tính", time: "" },
        { title: "Đề cương", content: "Môn Lập trình hướng đối tượng", time: "" }
      ]
    }
  ];

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-3 border-t-4 border-purple-500">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-1/3">
        <FaSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm môn học, thông báo..."
          className="ml-2 bg-transparent outline-none w-full text-gray-600"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 relative">
        {icons.map(({ Icon, name, label, count, dropdownContent }) => (
          <div key={name} className="relative">
            <button
              onClick={() => toggleDropdown(name)}
              className={`p-2 rounded-full transition-colors ${activeDropdown === name ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
              aria-label={label}
            >
              <Icon size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {count}
                </span>
              )}
            </button>
            
            {/* Dropdown content */}
            {activeDropdown === name && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-3 font-medium border-b border-gray-200 flex justify-between items-center">
                  <span>{label}</span>
                  {count > 0 && <span className="text-xs text-purple-600">{count} mới</span>}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {dropdownContent.map((item, index) => (
                    <div 
                      key={index} 
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.content}</div>
                      {item.time && <div className="text-xs text-gray-400 mt-1">{item.time}</div>}
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <button 
                    className="text-sm text-purple-600 hover:underline"
                    onClick={() => {
                      navigate(`/${name}`);
                      setActiveDropdown(null);
                    }}
                  >
                    Xem tất cả
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4 relative">
        <div 
          className="flex items-center gap-2 bg-gray-200 rounded-full pr-6 pl-2 py-1 cursor-pointer hover:bg-gray-300"
          onClick={() => toggleDropdown('profile')}
        >
          <img
            src="https://pencco.com.vn/wp-content/uploads/2024/09/Mau-do-1.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">Nguyễn Văn A</p>
            <p className="text-xs text-gray-500">Sinh viên</p>
          </div>
        </div>
        
        {/* User dropdown */}
        {activeDropdown === 'profile' && (
          <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <div 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                navigate('/CourseRegistration');
                setActiveDropdown(null);
              }}
            >
              <FaUser size={14} />
              <span>Hồ sơ cá nhân</span>
            </div>
            <div 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-500"
              onClick={handleLogout}
            >
              <FaSignOutAlt size={14} />
              <span>Đăng xuất</span>
            </div>
          </div>
        )}

        <button 
          className="px-3 py-1 bg-gray-200 rounded-lg text-sm hover:bg-gray-300"
          onClick={() => alert('Chuyển ngôn ngữ')}
        >
          EN
        </button>
      </div>
    </div>
  );
}