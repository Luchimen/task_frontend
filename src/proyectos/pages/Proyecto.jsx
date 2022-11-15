import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alerta } from "../../helpers/Alerta";
import { Spinner } from "../../helpers/Spinner";
import useAdmin from "../../hooks/useAdmin";
import useProyectos from "../../hooks/useProyectos";
import { Colaborador, ModalFormularioTarea, Tarea } from "../components";
import io from "socket.io-client";
let socket;
export const Proyecto = () => {
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const {
    obtenerProyecto,
    proyectoSeleccionado,
    cargando,
    eliminarProyecto,
    handleModalTarea,
    alerta,
    submitTareasProyecto,
    onDeleteTareasProyecto,
    onUpdateTareasProyecto,
  } = useProyectos();
  const admin = useAdmin();
  console.log(admin);
  useEffect(() => {
    obtenerProyecto(id);
  }, []);
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", id);
  }, []);
  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyectoSeleccionado._id) {
        submitTareasProyecto(tareaNueva);
      }
    });
    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyectoSeleccionado._id) {
        onDeleteTareasProyecto(tareaEliminada);
      }
    });
    socket.on("tarea editada", (tareaEditada) => {
      if (tareaEditada.proyecto === proyectoSeleccionado._id) {
        onUpdateTareasProyecto(tareaEditada);
      }
    });
    socket.on("estado cambiado", (tareaEditada) => {
      if (tareaEditada.proyecto._id === proyectoSeleccionado._id) {
        onUpdateTareasProyecto(tareaEditada);
      }
    });
  });
  const { nombre } = proyectoSeleccionado;
  const onDelete = () => {
    Swal.fire({
      title: "¿Está seguro de querer eliminarlo?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        eliminarProyecto(id);
      }
    });
  };

  return (
    <div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-black text-4xl">{nombre}</h1>
            {admin && (
              <>
                <div className="flex gap-5">
                  <Link
                    to={`/proyectos/editar/${id}`}
                    className="flex items-center gap-2 text-gray-500 hover:text-black uppercase font-bold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    Editar
                  </Link>
                  <button
                    className="flex items-center gap-2 text-red-500 hover:text-black uppercase font-bold"
                    onClick={onDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
          {admin && (
            <button
              className="bg-sky-500 color-white font-bold text-lg w-full md:w-auto px-4 py-2 mt-4 text-white rounded shadow flex items-center gap-3 hover:bg-sky-600 transition-colors"
              onClick={handleModalTarea}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Agregar Tarea
            </button>
          )}

          <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
          <div className="bg-white shadow mt-10 rounded-lg">
            {proyectoSeleccionado.tareas?.length ? (
              proyectoSeleccionado.tareas.map((tarea) => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
            ) : (
              <p className="text-center p-6">No hay tareas en este proyecto</p>
            )}
          </div>
          {admin && (
            <>
              <div className="flex items-center mt-5 justify-between">
                <p className="font-bold text-xl">Colaboradores</p>

                <Link
                  to={`/proyectos/nuevo-colaborador/${id}`}
                  className="text-gray-400 uppercase font-bold hover:text-gray-600"
                >
                  Añadir
                </Link>
              </div>

              <div className="bg-white shadow mt-10 rounded-lg">
                {proyectoSeleccionado.colaboradores?.length ? (
                  proyectoSeleccionado.colaboradores.map((colaborador) => (
                    <Colaborador
                      key={colaborador._id}
                      colaborador={colaborador}
                    />
                  ))
                ) : (
                  <p className="text-center p-6">
                    No hay colaboradores en este proyecto
                  </p>
                )}
              </div>
            </>
          )}

          <ModalFormularioTarea modal={modal} setModal={setModal} />
        </>
      )}
    </div>
  );
};
