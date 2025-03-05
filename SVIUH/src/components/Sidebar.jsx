import { FaSignOutAlt, FaUser } from "react-icons/fa";

const Sidebar = () => {

    const menu = [
        { name: "Trang chủ", path: "/home" },
        { name: "Thông tin chung", path: "/Score" },
        { name: "Lịch học", path: "/calendar" },,
        { name: "Học phí", path: "/Tuition" },
    ];

    return (
        <div className="w-64 bg-purple-700 text-white p-5 flex flex-col">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-3xl" />
            <div>
            <h2 className="font-bold">Nguyễn Văn B</h2>
            <p className="text-sm">Student</p>
            </div>
        </div>

        {/* Menu */}
        <nav className="flex-1">
            <ul>
            {menu.map((item, index) => (
                <li key={index} className="mb-3">
                <a href={item.path} className="block p-2 rounded-lg hover:bg-purple-500">
                    {item.name}
                </a>
                </li>
            ))}
            </ul>
        </nav>

        {/* Logout */}
        <button className="mt-auto flex items-center gap-2 p-2 bg-purple-800 hover:bg-purple-600 rounded-lg">
            <FaSignOutAlt /> Đăng xuất
        </button>
        </div>
    );
};

export default Sidebar;
