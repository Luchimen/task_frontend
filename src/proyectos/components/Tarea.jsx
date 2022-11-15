import Swal from "sweetalert2";
import { formatearFecha } from "../../helpers/formatearFecha";
import useAdmin from "../../hooks/useAdmin";
import useProyectos from "../../hooks/useProyectos";

export const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;
  const { handleModalTarea, obtenerTarea, eliminarTarea, cambiarEstadoTarea } =
    useProyectos();
  const admin = useAdmin();

  const onDeleteTarea = async () => {
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
        eliminarTarea(tarea);
      }
    });
  };
  return (
    <div className="border-b p-5 flex justify-between items-center gap-2">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600">{prioridad}</p>
        {estado && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">
            Completado por: {tarea.completado?.nombre}
          </p>
        )}
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => {
              handleModalTarea();
              obtenerTarea(tarea);
            }}
          >
            Editar
          </button>
        )}

        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => cambiarEstadoTarea(tarea)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={onDeleteTarea}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
