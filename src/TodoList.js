import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { v4 as uuidv4 } from 'uuid';

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [description, setDescription] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const item = {
      id,
      description,
      isComplete: false,
    };
    setTodoList([...todoList, item]);
    setDescription("");
  };

  const removeItem = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const toggleCompleted = (id) => {
    const list = todoList.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );
    setTodoList(list);
  };

  return (
    <div className="wrapper">
      <div className="todo-container">
        <div className="todo-title">
          <h1>Todo List</h1>
        </div>
        <div className="todo-body">
          <form id="todoForm" className="todo-form" onSubmit={addItem}>
            <input
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-label="description-input"
            />
            <button data-testid="addButton" className="add-button" type="submit">
              Add
            </button>
          </form>
          {todoList.length ? (
            <div className="todo-list">
              {todoList.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeItem={removeItem}
                  toggleCompleted={toggleCompleted}
                />
              ))}
            </div>
          ) : (
            <div>Your todo list is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TodoList;
