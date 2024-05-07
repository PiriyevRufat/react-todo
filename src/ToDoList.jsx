import React, { useState, useEffect } from 'react';
import TodoItem from './ToDoItem';

const TodoList = ({ todos, setTodos }) => {
    const [newTodo, setNewTodo] = useState("");
    const [sort, setSort] = useState('all');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);
    
    const addTodo = () => {
        if (newTodo.trim() === "") return;
        const newItem = {
            id: todos.length + 1,
            content: newTodo,
            isCompleted: false,
            isDeleted: false,
        };
        const updatedTodos = [...todos, newItem];
        setTodos(updatedTodos);
        setNewTodo("");
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter(item => item.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const completeTodo = (id) => {
        const updatedTodos = todos.map(item => {
            if (item.id === id) {
                return { ...item, isCompleted: !item.isCompleted };
            }
            return item;
        });
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const clearCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.isCompleted);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const sortedTodos = todos.filter(todo => {
        if (sort === 'active') {
            return !todo.isCompleted;
        } else if (sort === 'completed') {
            return todo.isCompleted;
        } else {
            return true;
        }
    });

    return (
        <React.Fragment>
            <div className="todo-list">
                <input
                    type="text"
                    placeholder="Create a new todo ..."
                    value={newTodo}
                    onChange={(e) => {
                        setNewTodo(e.target.value);
                    }}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <div className='added-todo'>
                <ul>
                    {sortedTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
                    ))}
                </ul>
                <div className='buttons'>
                    <button className={sort === 'all' ? 'active' : ''} onClick={() => setSort('all')}>All</button>
                    <button className={sort === 'active' ? 'active' : ''} onClick={() => setSort('active')}>Active</button>
                    <button className={sort === 'completed' ? 'active' : ''} onClick={() => setSort('completed')}>Completed</button>
                    <button onClick={clearCompleted}>Clear Completed</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TodoList;

