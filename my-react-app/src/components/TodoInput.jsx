import React from "react";

export default function TodoInput({ input, setInput, handleKeyPress, addOrEditTodo, editingId, clearAllTodos }) {
  return (
    <div className="flex justify-center mb-6 gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task"
        onKeyDown={handleKeyPress}
        className="border-2 border-gray-400 rounded-lg px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
      />
      <button onClick={addOrEditTodo} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        {editingId !== null ? "Update" : "Add"}
      </button>
      <button onClick={clearAllTodos} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
        Clear All
      </button>
    </div>
  );
}
