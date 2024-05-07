import React from 'react';

const TodoItem = ({ todo, deleteTodo, completeTodo }) => {

    return (
        <li className={todo.isCompleted ? "completed" : ""}>
            <input
                type="checkbox"
                className='checkbox'
                checked={todo.isCompleted}
                onChange={() => {
                    completeTodo(todo.id);
                }}
            />
            <p>{todo.content}</p>
            <button onClick={() => {
                deleteTodo(todo.id);
            }}>Delete</button>
        </li>
    );
};

export default TodoItem;


