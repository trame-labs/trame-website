import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/site.css';
import App from './App.jsx';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pre-rendered pages carry their path: hydrate them. In dev, or when a host serves a page for another
// path (404.html under /en/…), render from scratch instead.
const path = (p) => p.replace(/\/+$/, '') || '/';
if (root.dataset.path && path(root.dataset.path) === path(window.location.pathname)) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
