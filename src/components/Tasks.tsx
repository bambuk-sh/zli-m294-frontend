import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from "react";



function Tasks() {
    const [taskarr, setTaskarr] = useState<[] | Task[]>([]);
    const [task, setTask] = useState<Task>();
    const [catfish, setCatfish] = useState<{id: 0, title: '', completed: false} | Task>({id: 0, title: '', completed: false});


    useEffect(() => {
        http.get<Task[]>('/tasks').then(response => {
            setTaskarr(response.data);
        });

    }, []);

    function getTask(id: number) {
        http.get<Task>('/task/' + id).then(response => {
            setTask(response.data);
        });
    }

    function updateTaskCheck(id: number, completed: boolean) {
        http.get<Task>('/task/' + id).then(response => {
            http.put<Task>('/tasks/' + id, {
                id: response.data.id,
                title: response.data.title,
                completed: completed
            })
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        updateTaskCheck(1, event.target.checked);
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