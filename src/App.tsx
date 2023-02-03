import './pico.classless.css'
import Task_table from './components/task_table';
import React, { Component } from 'react';
import Task_add from './components/task_add';
import Task_view from './components/task_view';
import Task_edit from './components/task_edit';
import { Routes, Route, useParams } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Task_table />} />
        <Route path='/taskadd' element={<Task_add />} />
        <Route path='/taskview/:id' element={<Task_view />} />
        <Route path='/taskedit/:id' element={<Task_edit />} />
      </Routes>
    </div>
  );
}

export default App;