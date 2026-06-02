import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
export const InjectStyle = (value: string) => {
  const id = `rand_${Math.random().toString(36).substr(2, 9)}`
  if (document.getElementById(id) === null) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    style.innerHTML = value;
    document.getElementsByTagName('head')[0].appendChild(style);
  }
}
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