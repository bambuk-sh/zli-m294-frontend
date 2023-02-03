import './pico.classless.css'
import Task_table from './components/task_table';
import React from 'react';
import Task_add from './components/task_add';

function App() {
  return (
    <div className="App">
      <Task_table />
      <Task_add />
    </div>
  );
}

export default App;