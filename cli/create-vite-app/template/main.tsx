import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InjectStyle } from './utils';
const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

InjectStyle(`
  body{
    margin:0;
  }
  .ant-btn:not(:disabled):focus-visible {
    outline: none;
  }
`);
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