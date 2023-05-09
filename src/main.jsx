import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/Context';
import Alert from './components/Alert';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <UserProvider>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <App/>
        </QueryClientProvider>
          <Alert/>
      </UserProvider>
  </React.StrictMode>
);
