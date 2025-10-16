import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx';
import Login from './Login.tsx';
import Detalhes from './Detalhes.tsx';
import MeusPedidos from './MeusPedidos.tsx'; // Garanta que esta importação existe!
import CadCliente from './CadCliente.tsx';
import Produtos from './Produtos.tsx'; // A página de todos os produtos
import Layout from './Layout.tsx';

// ----------------- Rotas de Admin
import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';    
import AdminBolos from './admin/AdminBolos.tsx';          
import AdminNovoBolo from './admin/AdminNovoBolo.tsx';          
import AdminPedidos from './admin/AdminPedidos.tsx';          
import AdminCadAdmin from './admin/AdminCadAdmin.tsx';          

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "bolos", element: <AdminBolos /> },
      { path: "bolos/novo", element: <AdminNovoBolo /> },
      { path: "pedidos", element: <AdminPedidos /> },
      { path: "cadAdmin", element: <AdminCadAdmin /> },
    ],
  },
   {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'produtos', element: <Produtos /> },
      { path: 'detalhes/:boloId', element: <Detalhes /> },
      
    
      { path: 'meus-pedidos', element: <MeusPedidos /> }, 
      
      { path: 'cadCliente', element: <CadCliente /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)