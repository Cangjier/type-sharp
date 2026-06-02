import { forwardRef, useState } from 'react'
import './App.css'

export interface IAppRef {
  refresh: () => void;
}
export interface IAppProps {
  style?: React.CSSProperties;
}

export const App = forwardRef<IAppRef, IAppProps>((props, ref) => {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  }}>
    <div>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.85)',
        lineHeight: '24px',
        letterSpacing: '0px',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Source Han Serif SC, sans-serif',
      }}>
        {"Demo"}
      </div>
    </div>
    {/* 中间 */}
    <div>
      {/* 左侧 */}
      <div></div>
      {/* Tab */}
      <div></div>
      {/* 右侧 */}
      <div></div>
    </div>
    {/* 底部 */}
    <div></div>
  </div>
});

export default App
