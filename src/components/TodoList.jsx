import React from "react";

import '../style/style.css';

const TodoList = ({ todos, setTodoToEdit, deleteTodo }) => {    
  return (
    <>
        {todos.map((todo) => (
            <div key={todo.id} className="todo">
                <strong className="todo-title" title={todo.title}>{todo.title}</strong>
                
                <div className="todo-actions">
                    <div>{todo.status}  |  Due: {todo.due_date} </div>
                    
                    &nbsp;&nbsp;

                    <button onClick={() => setTodoToEdit(todo)}>Edit</button>                    
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
        
            </div>
        ))}
    </>
  );
};

export default TodoList;
