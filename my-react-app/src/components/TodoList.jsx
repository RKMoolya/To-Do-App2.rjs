import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, view, markComplete, editTodo, deleteTodo }) {
  const filteredTodos = todos.filter(todo => {
    if (view === "all") return true;
    if (view === "complete") return todo.completed;
    if (view === "pending") return !todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.length === 0 && <p className="text-center text-gray-600">No tasks here!</p>}
      {filteredTodos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          view={view} 
          markComplete={markComplete} 
          editTodo={editTodo} 
          deleteTodo={deleteTodo} 
        />
      ))}
    </ul>
  );
}

