import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ToastProvider } from './components/common/Toast';

/**
 * Main App component
 * Uses RouterProvider with createBrowserRouter for modern routing
 */
function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
