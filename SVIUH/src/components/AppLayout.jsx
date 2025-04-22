import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AppLayout = ({ children }) => {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          {/* Nội dung có thể cuộn */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {children || <Outlet />}
          </div>
        </div>
      </div>
    );
};

export default AppLayout;
