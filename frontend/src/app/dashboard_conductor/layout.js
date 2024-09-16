'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[
        //{ title: "Solicitud Modificación", link: "/dashboard_conductor/modificar", icon: faEdit },
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}