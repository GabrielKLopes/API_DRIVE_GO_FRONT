// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginRoutes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <LoginRoutes />
    </Router>
  );
};

export default App;
