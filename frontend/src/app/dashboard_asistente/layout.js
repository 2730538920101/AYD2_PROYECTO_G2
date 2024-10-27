'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { faCodePullRequest, faDriversLicense,faUsers} from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  return (
    <>
      <Sidebar routes={[
        { title: "Conductores", link: "/dashboard_asistente/conductores", icon: faDriversLicense },
        { title: "Usuarios", link: "/dashboard_asistente/usuarios", icon: faUsers },
        { title: "Solicitudes Empleo", link: "/dashboard_asistente/empleo", icon: faCodePullRequest },
        { title: "Ofertas", link: "/dashboard_asistente/ofertas", icon: faCodePullRequest },
      ]} />
      <main className="content">
        <Navbar />
        <br />
        {children}
      </main>
    </>
  );
}