import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { CssBaseline, CssVarsProvider } from '@mui/joy'

const rootElement = document.getElementById('root')
if (!rootElement) throw Error('connot find root element with that id')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <Provider store={store}>
    <CssVarsProvider>
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </Provider>,
)
