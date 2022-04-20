import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


document.addEventListener('contextmenu', event => event.preventDefault());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

