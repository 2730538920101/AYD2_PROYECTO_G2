'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faTag } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[

        { title: "Actializar Tarifas", link: "/dashboard_administrador/tarifas", icon: faTag },
        // { title: "Expedientes", link: "/dashboard_usuario/expediente", icon: faBook },
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}
