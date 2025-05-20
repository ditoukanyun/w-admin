import 'normalize.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes';

const App = () => {
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
