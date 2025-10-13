import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import CadastroUsuario from './CadastroUsuario.tsx'
import Detalhes from './Detalhes.tsx'
import MeusPedidos from './MeusPedidos.tsx'

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <CadastroUsuario /> },
      { path: 'detalhes/:boloId', element: <Detalhes /> },
      { path: 'meusPedidos', element: <MeusPedidos /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)