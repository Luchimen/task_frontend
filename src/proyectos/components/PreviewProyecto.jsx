import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const PreviewProyecto = ({ proyecto }) => {
  const { nombre, _id, cliente, creador } = proyecto;
  const { auth } = useAuth();
  return (
    <div className="border-b p-5 flex justify-between flex-col md:flex-row gap-2">
      <div className="flex items-center gap-1">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
        </p>
        {auth.id !== creador && (
          <p className="p-1 text-xs rounded-lg bg-green-500 text-white uppercase font-bold ">
            Colaborador
          </p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold ml-4"
      >
        Ver proyecto
      </Link>
    </div>
  );
};
