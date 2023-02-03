import { useState } from 'react';
import http from "../http";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';


function Task_add() {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState<string>('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        http.post('/tasks', {
            title: taskName,
            completed: false
        }).then(() => {
            Store.addNotification({
                title: 'Success',
                message: 'Task ' + taskName + ' sucessfully added',
                type: 'success',
                insert: 'top',
                container: 'top-right',
                dismiss: {
                    duration: 3500,
                    onScreen: true
                }
            });
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
                                <button type='submit' onClick={() => {
                                    if(!taskName){
                                        Store.addNotification({
                                            title: 'Error',
                                            message: 'Cannot add Task with empty title',
                                            type: 'danger',
                                            insert: 'top',
                                            container: 'top-right',
                                            dismiss: {
                                                duration: 2000,
                                                onScreen: true
                                            }
                                        });
                                    }
                                }}>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Task_add;