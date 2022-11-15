import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Header, SideBar } from "../proyectos/components";
export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  if (cargando) return "Cargando";
  return (
    <>
      {auth.id || auth._id ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-screen">
            <SideBar />
            <main className="flex-1 p-10">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
