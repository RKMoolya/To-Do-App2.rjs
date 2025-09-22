import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [view, setView] = useState("all"); // all | complete | pending

  // Fetch tasks from backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addOrEditTodo = () => {
    if (input.trim() === "") return;

    if (editingId !== null) {
      // Update task on backend
      fetch(`http://localhost:5000/tasks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      })
        .then(res => res.json())
        .then(updatedTask => {
          setTodos(prev => prev.map(t => t._id === editingId ? updatedTask : t));
          setEditingId(null);
          setInput("");
        });
    } else {
      // Add new task to backend
      fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      })
        .then(res => res.json())
        .then(newTask => {
          setTodos(prev => [...prev, newTask]);
          setInput("");
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addOrEditTodo();
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" })
      .then(() => setTodos(prev => prev.filter(t => t._id !== id)));
  };

  const markComplete = (id) => {
    const task = todos.find(t => t._id === id);
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }), // mark as complete
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTodos(prev => prev.map(t => t._id === id ? updatedTask : t));
      });
  };

  const editTodo = (id) => {
    const t = todos.find(t => t._id === id);
    setInput(t.title);
    setEditingId(id);
  };

  const clearAllTodos = () => {
    if (!window.confirm("Clear all tasks?")) return;
    // Delete all tasks from backend
    Promise.all(todos.map(t => fetch(`http://localhost:5000/tasks/${t._id}`, { method: "DELETE" })))
      .then(() => setTodos([]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6" style={{ fontFamily: "Georgia" }}>To Do App</h1>

      <Navbar view={view} setView={setView} />

      <div className="mx-auto w-2/3">
        {view === "all" && (
          <TodoInput
            input={input}
            setInput={setInput}
            handleKeyPress={handleKeyPress}
            addOrEditTodo={addOrEditTodo}
            editingId={editingId}
            clearAllTodos={clearAllTodos}
          />
        )}

        <TodoList
          todos={todos}
          view={view}
          markComplete={markComplete}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}
