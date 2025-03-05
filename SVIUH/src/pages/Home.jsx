import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
            <Header />
        </div>
    </div>
  );
};

export default Home;
