import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { RouterProvider } from './context/RouterProvider';
import { ThemeProvider } from './context/ThemeProvider';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found in index.html.');
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </StrictMode>,
);
