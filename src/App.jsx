import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import api from "./api";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [error, setError] = useState(null); // Add error state

  const fetchTodos = async () => {
    try {
      const response = await api.get("");
      setTodos(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while fetching the todo.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchTodos();
      setTodoToEdit(null);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while removing the todo.");
    }
  };

  return (
    <div style={{margin:"auto", width:"600px"}}>

      <h1>Todo List</h1>

      <TodoForm fetchTodos={fetchTodos} todoToEdit={todoToEdit} setTodoToEdit={setTodoToEdit} />
      
      <br />
      
      {error && <div className="error-message">{error}</div>}

      <TodoList todos={todos} setTodoToEdit={setTodoToEdit} deleteTodo={deleteTodo} />

      <Footer />

    </div>
  );
};

export default App;
