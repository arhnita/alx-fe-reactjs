import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  // Initialize component state with a few todos for demonstration
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: true }
  ]);

  // Method for adding todos
  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
    }
  };

  // Method for toggling todos
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Method for deleting todos
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      {todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span 
                onClick={() => toggleTodo(todo.id)}
                style={{ 
                  cursor: 'pointer',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#666' : '#000'
                }}
              >
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="delete-btn"
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;