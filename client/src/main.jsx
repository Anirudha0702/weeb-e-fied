import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './components/Provider/AuthProvider.jsx'
const queryClient =new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <App /> 
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
