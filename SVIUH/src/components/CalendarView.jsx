const CalendarView = () => {
    const days = Array(30).fill(0);
  
    return (
      <div className="w-2/3 bg-white p-4 rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button className="px-3 py-1 bg-green-500 text-white rounded-lg">Today 26</button>
          <h2 className="text-lg font-bold">September 2025</h2>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">Change routine</button>
        </div>
  
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((_, index) => (
            <div
              key={index}
              className={`h-16 flex items-center justify-center rounded-lg text-sm ${
                [5, 10, 15, 20].includes(index) ? "bg-green-200" :
                index === 26 ? "bg-purple-400 text-white" :
                "bg-gray-100"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    );
};

export default CalendarView;
  