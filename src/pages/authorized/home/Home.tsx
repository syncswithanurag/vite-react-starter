import { Navigate } from 'react-router-dom';
import * as urls from '../../../routes/config';

export default function Home() {
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return <Navigate to={urls.platform.base} replace />;
  }
}
