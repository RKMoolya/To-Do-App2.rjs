import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// Replace with your Render backend URL
const BACKEND_URL = "https://todo-backend-oxez.onrender.com";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [view, setView] = useState("all"); // all | complete | pending

  // Fetch tasks from backend
  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addOrEditTodo = () => {
    if (input.trim() === "") return;

    if (editingId !== null) {
      fetch(`${BACKEND_URL}/tasks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      })
        .then((res) => res.json())
        .then((updatedTask) => {
          setTodos((prev) =>
            prev.map((t) => (t._id === editingId ? updatedTask : t))
          );
          setEditingId(null);
          setInput("");
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`${BACKEND_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTodos((prev) => [...prev, newTask]);
          setInput("");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addOrEditTodo();
  };

  const deleteTodo = (id) => {
    fetch(`${BACKEND_URL}/tasks/${id}`, { method: "DELETE" })
      .then(() => setTodos((prev) => prev.filter((t) => t._id !== id)))
      .catch((err) => console.error(err));
  };

  const markComplete = (id) => {
    fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTodos((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      })
      .catch((err) => console.error(err));
  };

  const editTodo = (id) => {
    const t = todos.find((t) => t._id === id);
    setInput(t.title);
    setEditingId(id);
  };

  const clearAllTodos = () => {
    if (!window.confirm("Clear all tasks?")) return;
    Promise.all(
      todos.map((t) =>
        fetch(`${BACKEND_URL}/tasks/${t._id}`, { method: "DELETE" })
      )
    )
      .then(() => setTodos([]))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-4 sm:p-6 lg:p-10 flex flex-col">
      {/* Title */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6"
        style={{ fontFamily: "Georgia" }}
      >
        To Do App
      </h1>

      {/* Navbar */}
      <Navbar view={view} setView={setView} />

      {/* Main content wrapper */}
      <div className="flex-grow mx-auto w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
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
