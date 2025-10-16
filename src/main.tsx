import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MeusPedidos from './MeusPedidos.tsx'
import CadCliente from './CadCliente.tsx'
import Produtos from './Produtos.tsx' //

// ----------------- Rotas de Admin
import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';    
import AdminBolos from './admin/AdminBolos.tsx';          
import AdminNovoBolo from './admin/AdminNovoBolo.tsx';          
import AdminPedidos from './admin/AdminPedidos.tsx';          
import AdminCadAdmin from './admin/AdminCadAdmin.tsx';          
import AdminNovoAdmin from './admin/AdminNovoAdmin.tsx';

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminCategorias from './admin/AdminCategorias.tsx'

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
      { path: "categorias", element: <AdminCategorias /> },
      { path: "bolos", element: <AdminBolos /> },
      { path: "bolos/novo", element: <AdminNovoBolo /> },
      { path: "pedidos", element: <AdminPedidos /> },
      { path: "cadAdmin", element: <AdminCadAdmin /> },
      { path: "cadAdmin/novo", element: <AdminNovoAdmin /> }
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
      
      // --- A CORREÇÃO ESTÁ AQUI ---
      // Garanta que esta linha existe e está correta.
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