import AllProviders from './providers/AllProviders';
import MainRoutes from './routes/MainRoutes';

export default function App() {
  return (
    <AllProviders>
      <MainRoutes />
    </AllProviders>
  );
}
