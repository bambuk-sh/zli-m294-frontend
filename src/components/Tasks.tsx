import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from "react";



function Tasks() {
    const [taskarr, setTaskarr] = useState([]);
    const [checked, setChecked] = useState([]);
    function getTasks() {
        http.get('/tasks').then(response => {
            setTaskarr(response.data);
        });
    }
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className='Tasks'>
            <table>
                <tr>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Completed</th>
                </tr>
                {taskarr.map((item: Task) => (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>
                            {
                                React.createElement('input',{
                                    type: 'checkbox',
                                    defaultChecked: item.completed
                                })
                            }
                        </td>
                    </tr>
                ))}
            </table>
        </div >
    );
}
export default Tasks;