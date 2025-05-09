import { useState } from 'react'
import './App.css'
import { Flex } from './natived'

function App() {
  return <Flex direction='column' style={{
    width: '100vw',
    height: '100vh',
  }}>
    {/* 顶部 */}
    <Flex></Flex>
    {/* 中间 */}
    <Flex direction='row'>
      {/* 左侧 */}
      <Flex></Flex>
      {/* Tab */}
      <Flex></Flex>
      {/* 右侧 */}
      <Flex></Flex>
    </Flex>
    {/* 底部 */}
    <Flex></Flex>
  </Flex>
}

export default App
