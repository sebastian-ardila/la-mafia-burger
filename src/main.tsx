import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App'
import { CartProvider } from './context/CartContext'
import { TableProvider } from './context/TableContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TableProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </TableProvider>
    </HashRouter>
  </StrictMode>,
)
