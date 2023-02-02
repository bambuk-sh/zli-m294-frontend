import Task from "../types/task_type";
import http from "../http";
import React, { ButtonHTMLAttributes, ReactEventHandler, useEffect, useState } from "react";



function Tasks() {
    const [taskarr, setTaskarr] = useState<[] | Task[]>([]);
    const [task, setTask] = useState<Task>();
    const [catfish, setCatfish] = useState<{ id: 0, title: '', completed: false } | Task>({ id: 0, title: '', completed: false });

    function getTasks() {
        http.get<Task[]>('/tasks').then(response => {
            setTaskarr(response.data);
        });
    }

    useEffect(() => {
        getTasks();
    }, []);

    function getTask(id: number) {
        http.get<Task>('/task/' + id).then(response => {
            setTask(response.data);
        });
    }

    function updateTaskCheck(id: number, completed: boolean) {
        http.get<Task>('/task/' + id).then(response => {
            http.put<Task>('/tasks', {
                id: response.data.id,
                title: response.data.title,
                completed: completed
            })
        });
        getTasks();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        updateTaskCheck(Number(event.target.getAttribute('id')), event.target.checked);
    }

    function deleteButtonHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        http.delete('/task/' + id).then(() => {
            getTasks();
        })
    }


    return (
        <div className='Tasks'>
            <table>
                <thead>
                    <tr id='task_head'>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Completed</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {taskarr.map((item: Task) => (
                        <tr id={'task_id_' + item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>
                                {
                                    React.createElement('input', {
                                        type: 'checkbox',
                                        defaultChecked: item.completed,
                                        id: item.id,
                                        onChange: handleChange
                                    })
                                }
                            </td>
                            <td>
                                <button onClick={(e) => {
                                    deleteButtonHandler(e, item.id);
                                }}>Cat</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
export default Tasks;