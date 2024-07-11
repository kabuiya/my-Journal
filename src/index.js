import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
// import Home from './components/Home';
import App from './components/App';



const root = createRoot(document.getElementById('root'));

// Render the Home component inside the root.
root.render(
 <BrowserRouter>
    <App />
  </BrowserRouter>

);