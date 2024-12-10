import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={VITE_PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App></App>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

);