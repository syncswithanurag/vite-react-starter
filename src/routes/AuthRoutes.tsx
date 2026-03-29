import { auth } from './config';
import Login from '../pages/public/auth/components/Login';
import Logout from '../pages/public/auth/components/Logout';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AuthRouter() {
  return (
    <Routes>
      <Route path={auth.login} element={<Login />} />
      <Route path={auth.logout} element={<Logout />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
}
