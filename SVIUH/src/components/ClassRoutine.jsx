const ClassRoutine = () => {
    return (
      <div className="w-1/3 p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-bold mb-3">Class Routine</h2>
        <p className="text-gray-500 mb-4">September, 1st week</p>
  
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded-lg">
            <div>
              <h3 className="font-bold">Mathematics, Physics</h3>
              <p className="text-sm text-gray-500">Sep 1, 2025</p>
            </div>
            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
          </div>
        ))}
      </div>
    );
};

export default ClassRoutine;
  