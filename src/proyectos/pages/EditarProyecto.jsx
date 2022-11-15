import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";
import { FormularioProyecto } from "../components";

export const EditarProyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyectoSeleccionado, cargando } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
    console.log("Desde editar proyecto");
  }, []);
  const { nombre } = proyectoSeleccionado;

  return (
    <>
      <h1 className="font-black text-4xl">Editando {nombre}</h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto editando={true} />
      </div>
    </>
  );
};
