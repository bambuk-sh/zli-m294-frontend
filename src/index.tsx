import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactNotifications />
    <BrowserRouter>
      <nav>
        <ul>
          <li><strong>Fishcat Application</strong></li>
        </ul>
        <ul>
          <li><a href='/' role='button'>List all tasks</a></li>
          <li><a href='/taskadd/' role='button'>Add a task</a></li>
        </ul>
      </nav>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);