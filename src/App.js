import React from "react";
import TodoList from "./TodoList";
import AppHeader from "./AppHeader";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <TodoList />
    </div>
  );
}

export default App;
