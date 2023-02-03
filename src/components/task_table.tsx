import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from 'react';

function Task_table() {
    const [taskarr, setTaskarr] = useState<[] | Task[]>([]);
    const [checked, setChecked] = useState<boolean>(false);

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
            getTasks();
        }
        );
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="task_table">
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
                            <td><button>View</button></td>
                            <td><button>Edit</button></td>
                            <td><button onClick={(e) => { deleteButtonHandler(e, item.id) }}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Task_table;