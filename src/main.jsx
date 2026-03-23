import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ResearchReportPage from './ResearchReportPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResearchReportPage />
  </StrictMode>,
)
