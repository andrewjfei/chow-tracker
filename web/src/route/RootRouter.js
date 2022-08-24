import React, { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  ProtectedRoute,
  useNavigate,
} from 'react-router-dom';
import { AuthRoute } from './auth/AuthRoute';
import { AppRoute } from './app/AppRoute';

const RootRouter = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onSubmit = () => {
    setIsAuthenticated(true);
    navigate('/app');
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          isAuthenticated ? (
            <Navigate replace to='/app' />
          ) : (
            <Navigate replace to='/auth' />
          )
        }
      />
      <Route path='/auth' element={<AuthRoute onLogin={onSubmit} />} />
      <Route path='/app' element={<AppRoute />} />
    </Routes>
  );
};

export { RootRouter };
