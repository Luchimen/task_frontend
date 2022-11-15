import { useState } from "react";
import { Alerta } from "../../helpers/Alerta";
import useProyectos from "../../hooks/useProyectos";

export const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { alerta, mostrarAlerta, submitColaborador } = useProyectos();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      mostrarAlerta({
        error: true,
        msg: "El email es obligatorio",
      });
      return;
    }
    await submitColaborador(email);
    console.log(email);
  };
  console.log("Holaa");
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full"
      onSubmit={handleSubmit}
    >
      <div className="mt-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email colaborador
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Nombre de la tarea"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Buscar Colaborador"
        className="w-full text-white text-lg font-semibold bg-sky-600 cursor-pointer p-2 mt-5 hover:bg-sky-700 transition-colors rounded"
      />
      {alerta.msg && <Alerta alerta={alerta} />}
    </form>
  );
};
