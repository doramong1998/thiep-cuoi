import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GenLinkPage } from './scenes/GenLinkPage.tsx'

// Routing đơn giản theo pathname (không cần react-router)
const path = window.location.pathname.replace(/\/+$/, '')
const isGenLink = path === '/genlink'
const isGuest = path === '/khachmoi'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isGenLink ? <GenLinkPage /> : <App isGuestRoute={isGuest} />}
  </StrictMode>,
)
