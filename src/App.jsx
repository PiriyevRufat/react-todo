import React, { useState } from 'react';
import './App.css';
import TodoList from './ToDoList'; 

function App() {
  const [todos,setTodos]=useState([
    {
      id:1,
      content:"ders oxumaq",
      isDeleted :false,
      isCompleted:false
    }
  ])
  return (
    <React.Fragment>
      <div className="fonimage">
        <div className='container'>
          <div className='header'>
            <h2>TODO</h2>
            <i className="fa-solid fa-moon"></i>
          </div>
        </div>
      </div>
      <TodoList todos={todos} setTodos={setTodos} />
    </React.Fragment>
  );
}

export default App;