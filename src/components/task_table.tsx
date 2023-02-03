import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from 'react';

function Task_table() {
    const [taskarr, setTaskarr] = useState<[] | Task[]>([]);

    useEffect(() => {
        http.get<Task[]>('/tasks').then((result) => {
            setTaskarr(result.data);
        });
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
                                <input type='checkbox' defaultChecked={item.completed} />
                            </td>
                            <td><button>View</button></td>
                            <td><button>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Task_table;