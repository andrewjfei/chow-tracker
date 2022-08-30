import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AuthRoute } from './auth/AuthRoute';
import { AppRoute } from './app/AppRoute';
import { TestRoute } from './TestRoute';

const RootRouter = () => {
  const { user } = useSelector((state) => state.auth);

  useState(() => {}, [user]);

  return (
    <Routes>
      <Route
        path='/'
        element={
          user ? (
            <Navigate replace to='/app' />
          ) : (
            <Navigate replace to='/auth' />
          )
        }
      />
      <Route path='/auth' element={<AuthRoute />} />
      <Route path='/app' element={<AppRoute />} />
      <Route path='/test' element={<TestRoute />} />
    </Routes>
  );
};

export { RootRouter };
