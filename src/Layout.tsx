import Titulo from './components/Header.tsx'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Footer from "./components/Footer.tsx";

export default function Layout() {
  return (
    <>
      <Titulo />
      <Outlet />  
      <Footer /> 
      <Toaster richColors position="top-center" />
    </>
  )
}
