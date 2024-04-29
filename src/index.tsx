
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const rootElement = document.getElementById('root')
// if(!rootElement) throw Error("connot find root element with that id")

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './Redux/Features/store'
import { Provider } from 'react-redux'
render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)