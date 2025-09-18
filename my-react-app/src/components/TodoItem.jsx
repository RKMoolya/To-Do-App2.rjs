import React from "react";

export default function TodoItem({ todo, view, markComplete, editTodo, deleteTodo }) {
  return (
    <li className="flex justify-between items-center mb-2 bg-white p-3 rounded shadow">
      <span className={todo.completed && view !== "all" ? "text-gray-500 line-through" : ""}>
        {todo.text}
      </span>

      {view === "all" && (
        <div className="flex gap-2">
          {!todo.completed && (
            <button 
              onClick={() => markComplete(todo.id)} 
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Completed
            </button>
          )}
          {!todo.completed && (
            <button 
              onClick={() => editTodo(todo.id)} 
              className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          <button 
            onClick={() => deleteTodo(todo.id)} 
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
