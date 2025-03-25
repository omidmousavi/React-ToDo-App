import React, { useState, useEffect } from "react";
import api from "../api"; // Import the API
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../style/style.css';

const TodoForm = ({ fetchTodos, todoToEdit, setTodoToEdit }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    due_date: new Date(),
    status: "Pending",
  });


  useEffect(() => {
    if (todoToEdit) {
      setFormData({
        title: todoToEdit.title,
        due_date: new Date(todoToEdit.due_date),
        status: todoToEdit.status,
      });
    }
  }, [todoToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      due_date: date,
    });    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === "" || formData.due_date.length < 5) {
      alert("Please enter a title and date.");
      return;
    }

    try {
      
      setError(null);

      const formattedDate = formData.due_date.toLocaleDateString("en-CA"); // 'en-CA' for YYYY-MM-DD format

      const updatedFormData = {...formData, due_date: formattedDate};      

      if (todoToEdit) {
        await api.put(`/update/${todoToEdit.id}`, updatedFormData);
      } else {
        await api.post("/store", updatedFormData);
      }

      fetchTodos();
      setFormData({
        title: "",
        due_date: new Date(),
        status: "Pending",
      });
      setTodoToEdit(null);
    } catch (error) {
        setError(error.response?.data?.message || "An error occurred while saving the todo.");
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      due_date: new Date(),
      status: "Pending",
    });
    setTodoToEdit(null);
    setError(null);
  };

  return (
    <>
        <form onSubmit={handleSubmit} className="add-form">

            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
            style={{width:"300px"}}
            />

            <DatePicker
            selected={formData.due_date}
            onChange={handleDateChange} 
            dateFormat="yyyy/MM/dd"
            minDate={new Date()}
            placeholderText="Select date"
            />

            <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
            </select>

        <button type="submit" style={{width:"100%"}}>
            {todoToEdit ? "Update Todo" : "Add Todo"}
        </button>

        {todoToEdit && (
            <button type="button" onClick={handleCancel}>
            Cancel
            </button>
        )}
        </form>
        
        <br />

        {error && <div className="error-message">{error}</div>}
    
    </>
  );
};

export default TodoForm;
