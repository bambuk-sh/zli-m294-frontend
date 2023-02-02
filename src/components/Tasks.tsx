import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from "react";



function Tasks() {
    const [taskarr, setTaskarr] = useState([]);
    const [checked, setChecked] = useState(false);
    function getTasks() {
        http.get('/tasks').then(response => {
            setTaskarr(response.data);
        });
    }
    useEffect(() => {
        getTasks();
    }, []);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setChecked(event.target.checked);
        console.log('check: ' + event.target.checked + ' id: ' + event.target.getAttribute('id'));
    }

    return (
        <div className='Tasks'>
            <table>
                <thead>
                    <tr id='task_head'>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Completed</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
export default Tasks;