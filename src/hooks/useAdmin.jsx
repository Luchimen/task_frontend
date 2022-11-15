import useAuth from "./useAuth";
import useProyectos from "./useProyectos";

const useAdmin = () => {
  const { proyectoSeleccionado } = useProyectos();
  const { auth } = useAuth();
  return proyectoSeleccionado.creador === auth.id;
};
export default useAdmin;
