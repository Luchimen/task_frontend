import { useEffect, useState } from "react";
import { Alerta } from "../../helpers/Alerta";
import { useForm } from "../../hooks/useForm";
import useProyectos from "../../hooks/useProyectos";

export const FormularioProyecto = ({ editando }) => {
  const {
    crearProyecto,
    alerta,
    setAlerta,
    proyectoSeleccionado,
    editarProyectoSeleccionado,
  } = useProyectos();
  const [initialValue, setInitialValue] = useState({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    cliente: "",
  });
  useEffect(() => {
    if (editando === true && proyectoSeleccionado.nombre) {
      setInitialValue({
        ...proyectoSeleccionado,
        fechaEntrega: proyectoSeleccionado.fechaEntrega?.split("T")[0],
      });
    }
    console.log("Desde el useffect");
  }, [proyectoSeleccionado.nombre, editando]);
  const {
    nombre,
    descripcion,
    fechaEntrega,
    cliente,
    onInputChange,
    onResetForm,
    formState,
  } = useForm(initialValue);
  console.log("Holiwiii");

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(fechaEntrega);
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
    }
    !editando
      ? await crearProyecto(formState)
      : await editarProyectoSeleccionado(formState);

    setInitialValue({
      nombre: "",
      descripcion: "",
      fechaEntrega: "",
      cliente: "",
    });
  };

  return (
    <>
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg"
        onSubmit={submitForm}
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Nombre del Proyecto
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del proyecto"
            value={nombre}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Descripcion
          </label>
          <textarea
            name="descripcion"
            id="nombre"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Descripcion del proyecto"
            value={descripcion}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fecha-entrega"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Fecha de Entrega
          </label>
          <input
            type="date"
            name="fechaEntrega"
            id="fecha-entrega"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechaEntrega}
            onChange={onInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="cliente"
            className="text-gray-700 uppercase font-bold text-sm"
          >
            Nombre del Cliente
          </label>
          <input
            type="text"
            name="cliente"
            id="cliente"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del proyecto"
            value={cliente}
            onChange={onInputChange}
          />
        </div>
        <input
          type="submit"
          value={editando ? "Actualizando proyecto" : "Crear proyecto"}
          className="w-full p-2 bg-sky-600 text-white text- uppercase rounded shadow font-bold cursor-pointer hover:bg-sky-700 transition-colors"
        />
        {alerta.msg && <Alerta alerta={alerta} />}
      </form>
    </>
  );
};
