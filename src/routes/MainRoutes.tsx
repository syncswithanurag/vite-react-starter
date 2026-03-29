import { Suspense } from 'react';
import AuthRouter from './AuthRoutes';
import Home from '../pages/authorized/home/Home';
import * as urls from '../routes/config';
import AppLayout from '../components/Layouts/AppLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from '../pages/public/others/PageNotFound';
import PrivateRoute from '../components/AppGuards/PrivateRoute';

export default function MainRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Auth Routes */}
        <Route path={`${urls.auth.base}/*`} element={<AuthRouter />} />

        <Route
          path='/'
          element={
            <PrivateRoute
              outlet={
                <AppLayout>
                  <Home />
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
