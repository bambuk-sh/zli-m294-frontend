import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "react-notifications-component";

function Task_view() {
    const navigate = useNavigate();
    const params = useParams();
    const task_id = params.id;
    const [task, setTask] = useState<Task>({ id: 0, title: '', completed: false });

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
        http.delete<Task>('/task/' + id)
            .then(() => {
                Store.addNotification({
                    title: 'Success',
                    message: 'Task ' + task.title + ' deleted',
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

    useEffect(() => {
        http.get<Task>('/task/' + task_id).then((result) => {
            setTask(result.data);
        });
    }, []);

    return (
        <div className="task_view">
            <h1>View single task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>
                            <input type='checkbox'
                                defaultChecked={task.completed}
                                onChange={(e) => { checkboxHandler(e, task.id) }}
                            />
                        </td>
                        <td><a href={'/taskedit/' + task.id} role='button'>Edit</a></td>
                        <td><button onClick={(e) => { deleteButtonHandler(e, task.id) }}>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Task_view;