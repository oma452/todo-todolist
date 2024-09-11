import React from 'react'
import Create from './Create'
import axios from 'axios';
import { useState, useEffect } from 'react'
import './App.css'
import { BsCircleFill, BsFillPatchCheckFill, BsFillTrashFill } from 'react-icons/bs';

export default function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await axios.get('http://localhost:3001/');
                setTodos(result.data);
            } catch (err) {
                console.error('Error fetching todos:', err);
            }
        };

        fetchTodos();
    }, []);
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/' + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err))
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/' + id)
            .then(result => {
                location.reload();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='home'>
            <h2>
                Todo list
            </h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>no record </h2></div>
                    :
                    todos.map(todo => (
                        <div className='task'>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillPatchCheckFill className='icon'></BsFillPatchCheckFill>
                                    : <BsCircleFill className='icon' />}
                                <p className={todo.done ? "line_through" : ''}> {todo.task}</p>
                            </div>
                            <div>
                                <span>
                                    <BsFillTrashFill className="icon"
                                        onClick={(id) => handleDelete(todo._id)} />
                                </span>
                            </div>

                        </div>
                    ))
            }

        </div>
    )
}
