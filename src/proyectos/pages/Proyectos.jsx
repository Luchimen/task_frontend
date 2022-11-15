import { useEffect } from "react";
import { Alerta } from "../../helpers/Alerta";
import useProyectos from "../../hooks/useProyectos";
import { PreviewProyecto } from "../components";
import io from "socket.io-client";

let socket;
export const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();


  return (
    <>
      {alerta.msg && <Alerta alerta={alerta} />}
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white p-5 shadow mt-10 rounded-lg">
        {proyectos.length === 0 ? (
          <p className="text-gray-600 text-lg uppercase text-center ">
            No tienes ningún proyecto, empieza creando uno!
          </p>
        ) : (
          proyectos.map((proyecto) => (
            <PreviewProyecto proyecto={proyecto} key={proyecto._id} />
          ))
        )}
      </div>
    </>
  );
};
