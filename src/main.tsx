import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MindWellApp from './MindWellApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MindWellApp />
  </StrictMode>,
)
