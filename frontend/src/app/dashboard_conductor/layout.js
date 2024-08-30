'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[
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