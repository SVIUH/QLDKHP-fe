import { FaBell, FaGift, FaEnvelope, FaFolder, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-3 border-t-4 border-purple-500">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-1/3">
        <FaSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search here..."
          className="ml-2 bg-transparent outline-none w-full text-gray-600"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        {[
          { Icon: FaBell, label: "Thông báo" },
          { Icon: FaGift, label: "Quà tặng" },
          { Icon: FaEnvelope, label: "Tin nhắn" },
          { Icon: FaFolder, label: "Tài liệu" },
        ].map(({ Icon }, index) => (
          <div key={index} className="relative p-2 bg-gray-200 rounded-full">
            <Icon className="text-gray-500" size={20} />
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              9
            </span>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-200 rounded-full pr-6">
          <img
            src="https://pencco.com.vn/wp-content/uploads/2024/09/Mau-do-1.jpg"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">KN</p>
            <p className="text-xs text-gray-500">Supper admin</p>
          </div>
        </div>
        <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm">EN</button>
      </div>
    </div>
  );
}
