import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './Redux/store'

const rootElement = document.getElementById('root')
if (!rootElement) throw Error('connot find root element with that id')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
)