import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProyectos from "../../hooks/useProyectos";
import Busqueda from "./Busqueda";

export const Header = () => {
  const { handleBuscador, obtenerProyectos, cerrarSesionProyectos } =
    useProyectos();
  const { cerrarSesionAuth } = useAuth();
  useEffect(() => {
    obtenerProyectos();
  }, []);
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black mb-5 md:mb-0 text-center">
          Uptask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="font-bold uppercase" onClick={handleBuscador}>
            Buscar Proyecto
          </button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onClick={() => {
              cerrarSesionProyectos();
              cerrarSesionAuth();
            }}
          >
            Cerrar Sesion
          </button>
          <Busqueda />
        </div>
      </div>
    </header>
  );
};
