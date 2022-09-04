import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthRoute, AppRoute } from '.';

const RootRoute = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Navigate replace to='/auth' />} />
      <Route path='/auth' element={<AuthRoute />} />
      <Route path='/app' element={<AppRoute />} />
    </Routes>
  );
};

export { RootRoute };
