import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MainLayout from './components/layout/MainLayout'
import { routes } from './routes'
import { CreateAccount, LoginAccount } from './routes/AllComponents'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAccount />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
export default App

