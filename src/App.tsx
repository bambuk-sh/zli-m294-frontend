import './pico.classless.css'
import Tasks from './components/Tasks';
import TaskAdd from './components/task_add';
import Task_table from './components/task_table';

function App() {
  return (
    <div className="App">
      <Task_table />
      <TaskAdd />
    </div>
  );
}

export default App;