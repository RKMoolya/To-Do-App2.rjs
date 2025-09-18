import React from "react";

export default function Navbar({ view, setView }) {
  return (
    <nav className="flex justify-center gap-4 mb-6">
      <button 
        onClick={() => setView("all")} 
        className={`px-3 py-1 rounded-lg font-semibold ${view==='all'? 'bg-blue-600 text-white':'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        All Tasks
      </button>
      <button 
        onClick={() => setView("complete")} 
        className={`px-3 py-1 rounded-lg font-semibold ${view==='complete'? 'bg-green-600 text-white':'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Completed
      </button>
      <button 
        onClick={() => setView("pending")} 
        className={`px-3 py-1 rounded-lg font-semibold ${view==='pending'? 'bg-yellow-600 text-white':'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Pending
      </button>
    </nav>
  );
}
