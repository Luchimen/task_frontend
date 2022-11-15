
import { useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import { Alerta } from "../../helpers/Alerta";
import { useForm } from "../../hooks/useForm";

const initialValue = {
  email: "",
};
export const ForgetPassword = () => {
  const [alerta, setAlerta] = useState({});
  const { email, onInputChange, onResetForm } = useForm(initialValue);

  const submitForm = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({
        error: true,
        msg: "El campo de email es obligatorio",
      });
      return;
    }
    const url = `/usuarios/olvide-password`;
    try {
      const { data } = await clienteAxios.post(url, { email });
      setAlerta({
        error: false,
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Recupera tu cuenta y no pierdas acceso a tus
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={submitForm}
      >
        <div className="my-5 ">
          <label
            htmlFor="email"
            className="uppercase block text-xl font-bold text-gray-600"
          >
            Ingrese su correo asociado a la cuenta
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-500"
            value={email}
            name="email"
            onChange={onInputChange}
          />
        </div>

        <input
          type="submit"
          value="Recupera tu cuenta"
          className="w-full bg-sky-700 py-3 rounded text-white text-xl cursor-pointer hover:bg-sky-800 transition-colors font-bold mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Ya tienes una cuenta? Inicia sesión.
        </Link>
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Registrate!
        </Link>
      </nav>
      {alerta.msg && <Alerta alerta={alerta} />}
    </>
  );
};
