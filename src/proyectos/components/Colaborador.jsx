import Swal from "sweetalert2";
import useProyectos from "../../hooks/useProyectos";

export const Colaborador = ({ colaborador }) => {
  const { nombre, email,_id } = colaborador;
  const { eliminarColaborador } = useProyectos();

  const onDeleteColaborador = () => {
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
      }
      eliminarColaborador(_id);
    });
  };
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 rounded-lg text-white px-4 py-3 uppercase font-bold text-sm"
          onClick={onDeleteColaborador}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
