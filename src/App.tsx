import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

// App.tsx — wiring only. Do NOT add logic here.
export default function App() {
  return <RouterProvider router={router} />;
}
