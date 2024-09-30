'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faUser, faCar, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
  return (
    <>
      <Sidebar routes={[
        { title: "Perfil", link: "/dashboard_usuario/modificar", icon: faUser },
        { title: "Viajes", link: "/dashboard_usuario/viajes", icon: faCar },
        { title: "Historial", link: "/dashboard_usuario/historial", icon: faClockRotateLeft }
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}
