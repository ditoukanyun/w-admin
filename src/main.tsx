import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './App.less';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
