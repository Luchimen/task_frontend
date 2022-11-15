import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import io from "socket.io-client";
let socket;
const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [alerta, setAlerta] = useState({});
  const [buscador, setBuscador] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const crearProyecto = async (proyecto) => {
    try {
      const { data } = await clienteAxios.post("/proyectos", {
        ...proyecto,
        creador: auth.id,
      });
      setProyectos([...proyectos, data.newProyecto]);
      setAlerta({
        error: false,
        msg: data.msg,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerProyecto = async (id) => {
    setProyectoSeleccionado({});
    setCargando(true);
    try {
      const { data } = await clienteAxios(`/proyectos/${id}`);
      setProyectoSeleccionado({ ...data.proyecto });
      setColaborador({});
    } catch (error) {
      navigate("/proyectos");
      setAlerta({
        error: true,
        msg: error.response.data.msg,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const obtenerProyectos = async () => {
    setProyectoSeleccionado({});
    try {
      const { data } = await clienteAxios("/proyectos");
      setProyectos(data.listaProyectos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setProyectoSeleccionado({});
  }, []);

  const editarProyectoSeleccionado = async (proyecto) => {
    try {
      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto._id}`,
        proyecto
      );
      console.log(data.proyecto);
      setProyectos(
        proyectos.map((proyecto) => {
          if (proyecto._id === data.proyecto._id) {
            return data.proyecto;
          }
          return proyecto;
        })
      );
      setAlerta({
        error: false,
        msg: data.msg,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };
  const eliminarProyecto = async (id) => {
    try {
      await clienteAxios.delete(`/proyectos/${id}`);
      setProyectos(proyectos.filter((proyecto) => proyecto._id !== id));
      setTimeout(() => {
        navigate("/proyectos");
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
  };

  const submitTarea = async (tarea) => {
    console.log(tarea);
    try {
      const { data } = await clienteAxios.post("/tareas", {
        ...tarea,
        proyecto: proyectoSeleccionado._id,
      });
      setAlerta({
        error: false,
        msg: data.msg,
      });
      //Socket io
      socket.emit("nueva tarea", data.newTarea);
      setTimeout(() => {
        handleModalTarea();
      }, 700);
    } catch (error) {
      console.log(error);
    }
  };
  const editarTarea = async (tarea) => {
    try {
      const { data } = await clienteAxios.put(`/tareas/${tarea._id}`, tarea);
      setAlerta({
        error: false,
        msg: data.msg,
      });
      socket.emit("editar tarea", data.tarea);

      setTimeout(() => {
        setAlerta({});
        setModalFormularioTarea(false);
      }, 300);
      setTareaSeleccionada({});
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerTarea = async (tarea) => {
    // try {
    //   const { data } = await clienteAxios(`/tareas/${id}`);
    //   setTareaSeleccionada(data.tarea);
    // } catch (error) {
    //   console.log(error);
    // }
    setTareaSeleccionada(tarea);
  };

  const eliminarTarea = async (tarea) => {
    try {
      await clienteAxios.delete(`/tareas/${tarea._id}`);
      //socket io
      socket.emit("eliminar tarea", tarea);
    } catch (error) {
      console.log(error);
    }
  };
  const mostrarAlerta = (alerta = {}) => {
    console.log("holaa");
    setAlerta({
      error: alerta.error,
      msg: alerta.msg,
    });
    setTimeout(() => {
      setAlerta({});
    }, 1200);
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    try {
      const { data } = await clienteAxios.post(`/proyectos/colaboradores`, {
        email,
      });
      setColaborador(data.usuario);
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg,
      });
      setTimeout(() => {
        setAlerta({});
      }, 1200);
    }
    setCargando(false);
  };

  const agregarColaborador = async () => {
    try {
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyectoSeleccionado._id}`,
        {
          email: colaborador.email,
        }
      );
      setColaborador({});
      setAlerta({
        error: false,
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg,
      });
      setTimeout(() => {
        setAlerta({});
      }, 1200);
    }
  };
  const eliminarColaborador = async (id) => {
    try {
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaboradores/${proyectoSeleccionado._id}`,
        { id }
      );
      let proyectoActualizado = { ...proyectoSeleccionado };
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter((state) => state._id !== id);
      setProyectoSeleccionado(proyectoActualizado);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarEstadoTarea = async (tarea) => {
    try {
      const { data } = await clienteAxios.post(
        `/tareas/estado/${tarea._id}`,
        {}
      );
      socket.emit("cambiar estado", data.tarea);

      setTareaSeleccionada({});
      setAlerta({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  //socketio functions

  const submitTareasProyecto = (tarea) => {
    setProyectoSeleccionado({
      ...proyectoSeleccionado,
      tareas: [...proyectoSeleccionado.tareas, tarea],
    });
  };
  const onDeleteTareasProyecto = (tarea) => {
    let proyectoActualizado = { ...proyectoSeleccionado };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tarea._id
    );
    setProyectoSeleccionado(proyectoActualizado);
  };
  const onUpdateTareasProyecto = (tarea) => {
    let proyectoActualizado = { ...proyectoSeleccionado };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(
      (tareaState) => {
        if (tareaState._id === tarea._id) {
          return tarea;
        }
        return tareaState;
      }
    );
    setProyectoSeleccionado(proyectoActualizado);
  };
  const onChangeStateTask = (tarea) => {
    let proyectoActualizado = { ...proyectoSeleccionado };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyectoSeleccionado(proyectoActualizado);
  };
  const cerrarSesionProyectos = () => {
    setProyectoSeleccionado({});
    setProyectos([]);
    setTareaSeleccionada({});
    setColaborador({});
  };

  return (
    <ProyectosContext.Provider
      value={{
        crearProyecto,
        alerta,
        setAlerta,
        obtenerProyectos,
        proyectos,
        obtenerProyecto,
        proyectoSeleccionado,
        cargando,
        editarProyectoSeleccionado,
        eliminarProyecto,
        handleModalTarea,
        modalFormularioTarea,
        submitTarea,
        obtenerTarea,
        tareaSeleccionada,
        editarTarea,
        eliminarTarea,
        mostrarAlerta,
        submitColaborador,
        colaborador,
        agregarColaborador,
        eliminarColaborador,
        cambiarEstadoTarea,
        handleBuscador,
        buscador,
        submitTareasProyecto,
        onDeleteTareasProyecto,
        onUpdateTareasProyecto,
        onChangeStateTask,
        cerrarSesionProyectos,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};
export { ProyectosProvider };
export default ProyectosContext;
