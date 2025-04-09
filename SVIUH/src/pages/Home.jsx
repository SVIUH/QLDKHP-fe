import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Quick Links */}
            <div className="space-y-6">
              {/* Quick Access Cards */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-4">Truy cập nhanh</h3>
                <div className="space-y-3">
                  {['Lịch thi', 'Nhắc nhở', 'Khảo sát', 'Lịch học'].map((item, index) => (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <span className="text-purple-600 font-bold">{index}</span>
                      </div>
                      <div>
                        <p className="font-medium">{item}</p>
                        <p className="text-sm text-gray-500">Hi</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Section */}
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-lg mb-4">Thông báo</h3>
                <div className="space-y-4">
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Lịch học</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Các nhà đầu tư và chính xác có thể gửi cho các người kết quả.
                    </p>
                  </div>
                  <div className="border-b pb-3">
                    <h4 className="font-medium">Đóng học phí HK2</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Các nhà đầu tư và chính xác có thể gửi cho các người kết quả.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Statistics */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4">Điểm số</h3>
              <div className="space-y-2">
                {[10, 8, 6, 4, 2, 0].map((score, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-24">
                      <span className="text-gray-600">Môn {index + 1}</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-purple-600 h-4 rounded-full" 
                        style={{ width: `${score * 10}%` }}
                      ></div>
                    </div>
                    <div className="w-10 text-right">
                      <span className="font-medium">{score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Events */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-4">Sự kiện đang diễn ra</h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Nhập môn...</h4>
                      <p className="text-sm text-gray-500">Wed</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Lovem ipsum is simply
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Hội thảo</h4>
                      <p className="text-sm text-gray-500">Thu</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Lovem ipsum is simply
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;