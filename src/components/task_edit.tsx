import Task from "../types/task_type";
import http from "../http";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Task_edit() {
    const params = useParams();
    const task_id = params.id;
    const [task, setTask] = useState<Task>({ id: 0, title: '', completed: false });

    useEffect(() => {
        http.get<Task>('/task/' + task_id).then((result) => {
            setTask(result.data);
        });
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        
    }

    return (
        <div className="task_edit">
            <h1>Edit task</h1>
            <form onSubmit={(e) => {handleSubmit}}>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <label><strong>Task title</strong>
                                    <input type='text' placeholder={task.title} id='tasktitle' name='tasktitle'></input>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td><button type='submit'>Save</button></td>
                            <td><button>Discard</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Task_edit;