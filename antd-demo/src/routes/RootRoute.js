import { Routes, Route } from 'react-router-dom';

import { AuthRoute, AppRoute } from '.';

const RootRoute = () => {
  return (
    <Routes>
      <Route index element={<AuthRoute />} />
      <Route path='/auth' element={<AuthRoute />} />
      <Route path='/app' element={<AppRoute />} />
    </Routes>
  );
};

export { RootRoute };
