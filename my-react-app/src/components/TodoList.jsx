import React from "react";

export default function TodoList({ todos, view, markComplete, editTodo, deleteTodo }) {
  // Filter tasks based on view
  const filteredTodos = todos.filter(task => {
    if (view === "complete") return task.completed;
    if (view === "pending") return !task.completed;
    return true; // all
  });

  return (
    <div>
      {filteredTodos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks to show</p>
      ) : (
        filteredTodos.map(task => (
          <div
            key={task._id}
            className="flex justify-between items-center p-2 mb-2 border rounded bg-white"
          >
            <div className="flex-grow">
              {task.title}
            </div>
            <div className="flex gap-2">
              {!task.completed && (
                <button
                  onClick={() => markComplete(task._id)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => editTodo(task._id)}
                className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(task._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
