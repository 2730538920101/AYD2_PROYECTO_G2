'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[
        { title: "Viajes", link: "/dashboard_conductor", icon: faEdit },
        { title: "Historial", link: "/dashboard_conductor/historial", icon: faEdit },
        { title: "Ganancias", link: "/dashboard_conductor/ganancias", icon: faEdit },
        { title: "Modificar Datos", link: "/dashboard_conductor/modificar", icon: faEdit },
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}