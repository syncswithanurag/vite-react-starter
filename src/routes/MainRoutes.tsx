import { Suspense } from 'react';
import AuthRouter from './AuthRoutes';
import * as urls from '../routes/config';
import AppLayout from '../components/Layouts/AppLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from '../pages/public/others/PageNotFound';
import PrivateRoute from '../components/AppGuards/PrivateRoute';
import PlatformRouter from './PlatformRoutes';
import Home from '../pages/authorized/home/Home';

export default function MainRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Auth Routes */}
        <Route path={`${urls.auth.base}/*`} element={<AuthRouter />} />

        <Route index path='/' element={<PrivateRoute outlet={<Home />} />} />
        <Route
          index
          path={`${urls.platform.base}/*`}
          element={
            <PrivateRoute
              outlet={
                <AppLayout>
                  <PlatformRouter />
                </AppLayout>
              }
            />
          }
        />

        <Route path='/404' element={<PageNotFound />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </Suspense>
  );
}
