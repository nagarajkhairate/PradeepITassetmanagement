import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Box } from '@mui/joy'

import MainLayout from './components/layout/MainLayout'
import { routes } from './routes'
import { CreateAccount, LoginAccount } from './routes/AllComponents'

const App = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<LoginAccount />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>

      </Routes>
    </Box>
  )
}
export default App

