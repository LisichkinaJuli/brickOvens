import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles.scss'
import App from './App.jsx'
import { TermList } from './TermList'

const descriptionList = document.getElementById('description-list');

const createD = createRoot(descriptionList);
createD.render(<TermList />)
/*createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)*/
