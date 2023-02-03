import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from 'react';
import Task_view from "./task_view";
import { Routes, Route, useParams } from 'react-router-dom'
import { Store } from "react-notifications-component";

function Task_table() {
    const [taskarr, setTaskarr] = useState<[] | Task[]>([]);
    const [deleteTask, setDeleteTask] = useState<Task>({ id: 0, title: '', completed: false });

    function getTasks() {
        http.get<Task[]>('/tasks').then((result) => {
            setTaskarr(result.data);
        });
    }

    function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>, id: number) {
        http.get<Task>('/task/' + id)
            .then((result) => {
                http.put<Task>('/tasks', {
                    id: id,
                    title: result.data.title,
                    completed: e.target.checked
                });
            });
    }

    function deleteButtonHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        e.preventDefault();

        http.delete('/task/' + id).then(() => {
            Store.addNotification({
                title: 'Success',
                message: 'Task with id ' + id + ' deleted',
                type: 'success',
                insert: 'top',
                container: 'top-right',
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
            getTasks();
        });
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="task_table">
            <h1>List of all tasks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th colSpan={3}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {taskarr.map((item: Task) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>
                                <input type='checkbox'
                                    defaultChecked={item.completed}
                                    onChange={(e) => { checkboxHandler(e, item.id) }}
                                />
                            </td>
                            <td><a href={'/taskview/' + item.id} role='button'>View</a></td>
                            <td><a href={'/taskedit/' + item.id} role='button'>Edit</a></td>
                            <td><button onClick={(e) => { deleteButtonHandler(e, item.id) }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Task_table;