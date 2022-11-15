import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";
import { FormularioColaborador } from "../components";

export const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    proyectoSeleccionado,
    cargando,
    colaborador,
    agregarColaborador,
  } = useProyectos();
  const { id } = useParams();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir colaborador(a) al proyeto de: {proyectoSeleccionado.nombre}
      </h1>
      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
      {cargando ? (
        <p className="text-center text-xl mt-10">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10 ">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-xl">{colaborador.nombre}</p>
                <button
                  type="button"
                  className="bg-slate-500 font-bold text-white text-sm uppercase px-5 rounded-lg py-1"
                  onClick={() => agregarColaborador()}
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
