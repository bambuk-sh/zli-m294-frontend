import Task from "../types/task_type";
import http from "../http";
import React, { ButtonHTMLAttributes, ReactEventHandler, useEffect, useState } from "react";



function Tasks() {
    const [taskarr, setTaskarr] = useState<[] | Task[]>([]);
    const [task, setTask] = useState<Task>();
    const [catfish, setCatfish] = useState<{ id: 0, title: '', completed: false } | Task>({ id: 0, title: '', completed: false });
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<Task>({ id: 0, title: '', completed: false });
    const [editText, setEditText] = useState<string>('');

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
        }).then(() => {
            getTasks();
        });
    }

    function updateTaskCheck(id: number, completed: boolean) {
        http.get<Task>('/task/' + id).then(response => {
            http.put<Task>('/tasks', {
                id: response.data.id,
                title: response.data.title,
                completed: completed
            })
        }).then(() => {
            getTasks();
        });
    }

    function updateTask(task: Task) {
        http.put<Task>('/tasks', task).then(() => {
            getTasks();
        });
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        updateTaskCheck(Number(event.target.getAttribute('id')), event.target.checked);
    }

    function deleteButtonHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        http.delete('/task/' + id).then(() => {
            getTasks();
        });
    }

    function editButtonHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) {
        http.get<Task>('/task/' + id).then(response => {
            setEditTask(response.data);
        }).then(() => {
            setEditText(editTask.title);
        }).then(() => {
            setEditMode(true);
        });
        getTasks();
    }

    function handleEditTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setEditText(event.target.value);
    }

    function saveButtonHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setEditMode(false);
        updateTask({
            id: editTask.id,
            title: editText,
            completed: editTask.completed
        });

        setEditTask({ id: 0, title: '', completed: false });
        setEditText('');
        getTasks();
    }
    function discardButtonHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setEditMode(false);

        setEditTask({ id: 0, title: '', completed: false });
        setEditText('');
        getTasks();
    }

    function editCat() {
        if (editMode) {
            return (
                <div>
                    <h2>Edit</h2>
                    <form>
                        <table>
                            <thead>
                                <th>Task ID</th>
                                <th>Task</th>
                                <th></th>
                                <th></th>
                            </thead>
                            <tbody>
                                <td>{editTask?.id}</td>
                                <td>
                                    <textarea id='editTextArea'
                                        defaultValue={editText}
                                        onChange={(e) => { handleEditTextChange(e); }}
                                    ></textarea>
                                </td>
                                <td>
                                    <button onClick={(e) => { saveButtonHandler(e); }}>Save</button>
                                    <button onClick={(e) => { discardButtonHandler(e); }}>Discard</button>
                                </td>
                            </tbody>
                        </table>
                    </form>
                </div>
            );
        }
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
                                    editButtonHandler(e, item.id);
                                }}>Edit</button>
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
            {editCat()}
        </div >
    );
}
export default Tasks;