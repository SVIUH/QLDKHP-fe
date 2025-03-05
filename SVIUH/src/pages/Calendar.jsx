import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CalendarView from "../components/CalendarView";
import ClassRoutine from "../components/ClassRoutine";

const Calendar = () => {
  const routineEvents = [
    {
      title: "OOP",
      date: new Date(2025, 2, 1),
    },
    {
      title: "NOW",
      date: new Date(2025, 2, 3), 
    },{
      title: "NOW",
      date: new Date(2025, 3, 3), 
    },{
      title: "NOW",
      date: new Date(2025, 3, 7), 
    },{
      title: "NOW",
      date: new Date(2025, 4, 3), 
    },{
      title: "NOW",
      date: new Date(2025, 4, 8), 
    },{
      title: "NOW",
      date: new Date(2025, 4, 15), 
    },{
      title: "NOW",
      date: new Date(2025, 5, 3), 
    },{
      title: "NOW",
      date: new Date(2025, 5, 9), 
    },{
      title: "NOW",
      date: new Date(2025, 5, 13), 
    },
  ];

  // Manage the current date state in the parent
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex mt-4 px-6">
          <ClassRoutine currentDate={currentDate} routineEvents={routineEvents} />
          <CalendarView
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            routineEvents={routineEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
