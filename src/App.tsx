import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Box } from '@mui/joy'

import MainLayout from './components/layout/MainLayout'
import { routes } from './routes'

const App = () => {
  return (
    <Box>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>

      </Routes>
    </Box>
  )
}
export default App

