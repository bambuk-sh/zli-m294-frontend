import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "react-notifications-component";

function Task_edit() {
    const navigate = useNavigate();
    const params = useParams();
    const task_id = params.id;
    const [task, setTask] = useState<Task>({ id: 0, title: '', completed: false });
    const [editText, setEditText] = useState('');

    useEffect(() => {
        http.get<Task>('/task/' + task_id).then((result) => {
            setTask(result.data);
        });
    }, []);

    function handleSubmit() {
        http.put('/tasks', {
            id: task.id,
            title: editText,
            completed: task.completed
        }).then(() => {
            Store.addNotification({
                title: 'Success',
                message: 'Task edit successful',
                type: 'success',
                insert: 'top',
                container: 'top-right',
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            navigate('/');
        });
    }

    return (
        <div className="task_edit">
            <h1>Edit task</h1>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <label><strong>Edit task: {task.title}</strong>
                                    <input type='text'
                                        placeholder='New task name'
                                        onChange={(e) => { setEditText(e.target.value) }}
                                        required
                                    ></input>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td><button type='submit' onClick={(e) => {
                                e.preventDefault();
                                if (!editText) {
                                    Store.addNotification({
                                        title: 'Error',
                                        message: 'Cannot set a task name to empty',
                                        type: 'danger',
                                        insert: 'top',
                                        container: 'top-right',
                                        dismiss: {
                                            duration: 2000,
                                            onScreen: true
                                        }
                                    });
                                }
                                handleSubmit();
                            }}>Save</button></td>
                            <td><button onClick={(e) => {
                                e.preventDefault();
                                navigate('/');
                            }}>Discard</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Task_edit;