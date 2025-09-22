import React from "react";

export default function TodoInput({ input, setInput, handleKeyPress, addOrEditTodo, editingId, clearAllTodos }) {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Add a new task..."
        className="flex-grow p-2 border border-gray-300 rounded-l"
      />
      <button
        onClick={addOrEditTodo}
        className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        {editingId ? "Update" : "Add"}
      </button>
      <button
        onClick={clearAllTodos}
        className="ml-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear All
      </button>
    </div>
  );
}
