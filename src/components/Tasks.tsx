import axios from "axios";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

function Tasks() {
    console.log(axios.get('http://127.0.0.1:3000/tasks').then(response => {
        return response.data;
    }));
    return (
        <h1>Tasks</h1>
    );
}
export default Tasks;