import './App.css';
import { Outlet, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from './errorHandler/ErrorBoundary.tsx'
import { AppRouter } from './routes';
import { UserFeedback } from './components/FeedBack.tsx';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={AppRouter} />
      <Outlet />
      <UserFeedback />
    </ErrorBoundary>
  );
}

export default App;
