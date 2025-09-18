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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    const normalized = saved.map((t, i) => (t.id ? t : { ...t, id: Date.now() + i }));
    setTodos(normalized);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addOrEditTodo = () => {
    if (input.trim() === "") return;

    if (editingId !== null) {
      setTodos(prev => prev.map(t => (t.id === editingId ? { ...t, text: input } : t)));
      setEditingId(null);
    } else {
      setTodos(prev => [...prev, { id: Date.now() + Math.floor(Math.random() * 1000), text: input, completed: false }]);
    }
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addOrEditTodo();
  };

  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id));
  const clearAllTodos = () => { if(window.confirm("Clear all tasks?")) setTodos([]); };
  const markComplete = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: true } : t));
  const editTodo = (id) => { const t = todos.find(t => t.id === id); setInput(t.text); setEditingId(id); };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-200 p-6">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-6" style={{ fontFamily: "Georgia" }}>To Do App</h1>
      
      <Navbar view={view} setView={setView} />

      {/* Container with fixed width matching input bar + buttons */}
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
