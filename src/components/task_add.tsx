import Task from "../types/task_type";
import { useState } from 'react';
import http from "../http";
import Tasks from "./Tasks";


function Task_add() {
    const [task, setTask] = useState<Task>({ id: 0, title: '', completed: false });
    const [taskName, setTaskName] = useState<string>('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        http.post('/tasks', {
            title: taskName,
            completed: false
        }).then(() => {
            window.location.reload();
        })
    }

    return (
        <div className="task_add">
            <form onSubmit={(e) => { handleSubmit(e) }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type='text' placeholder='Add a Task' onChange={(e) => {
                                    setTaskName(e.target.value);
                                }}></input>
                            </td>
                            <td>
                                <button type='submit'>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Task_add;