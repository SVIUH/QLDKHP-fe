import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CalendarView from "../components/CalendarView";
import ClassRoutine from "../components/ClassRoutine";

const Calendar = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex mt-4 px-6">
          <ClassRoutine />
          <CalendarView />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
