import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
/* 
import App from './App.jsx'
import { GlobalStyle } from './styles/GlobalStyle'
import { AppProvider } from './context/AppContext'
*/
import App from './Portfolio/App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 
    <AppProvider>
      <GlobalStyle />
      <App />
    </AppProvider> 
    */}

    <App />
  </React.StrictMode>,
)
