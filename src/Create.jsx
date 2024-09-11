import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function Create() {
    const [task, setTask] = useState('');


    const handleAdd = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        axios.post('http://localhost:3001/', { task })
            .then((result) => {
                console.log('Task added:', result.data);
                setTask(''); // Clear input field after successful add
                window.location.reload(); // Reload the page to fetch the updated list
            })

            .catch((err) => {
                console.error('Error adding task:', err);
            });
    };


    return (
        <div className='create_form'>
            <input
                type='text'
                placeholder='Enter task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type='button' onClick={handleAdd}>Add</button>
        </div>
    );
}
