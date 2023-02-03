import { useState } from 'react';
import http from "../http";
import React from "react";
import { useNavigate } from 'react-router-dom';


function Task_add() {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState<string>('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        http.post('/tasks', {
            title: taskName,
            completed: false
        }).then(() => {
            navigate('/');
        })
    }

    return (
        <div className="task_add">
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>
                                    <strong>Task Title:</strong>
                                    <input type='text' placeholder='Add a Task' required onChange={(e) => {
                                        setTaskName(e.target.value);
                                    }}></input>
                                </label>
                            </td>
                            <td>
                                <button type='submit'>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Task_add;