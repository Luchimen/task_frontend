import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../../helpers/Alerta";
import { useForm } from "../../hooks/useForm";
import clienteAxios from "../../config/clienteAxios";
const initialValue = {
  nombre: "",
  email: "",
  password: "",
  password2: "",
};
export const RegisterPage = () => {
  const {
    nombre,
    email,
    password,
    password2,
    onInputChange,
    onResetForm,
    formState,
  } = useForm(initialValue);
  const [alerta, setAlerta] = useState({});

  const submitForm = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, password2].includes("")) {
      setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      return;
    }
    if (password !== password2 || password.length < 6) {
      setAlerta({
        error: true,
        msg: "Los password no son iguales o el password es pequeñito",
      });
      return;
    }
    setAlerta({});
    try {
      const { data } = await clienteAxios.post("/usuarios", {
        ...formState,
      });
      setAlerta({
        error: false,
        msg: data.msg,
      });
      onResetForm();
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
        Recupera tu acceso y no pierdas tus
        <span className="text-slate-700">proyectos</span>
      </h1>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={submitForm}
      >
        <div className="my-5 ">
          <label
            htmlFor="nombre"
            className="uppercase block text-xl font-bold text-gray-600"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre completo"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-500"
            value={nombre}
            name="nombre"
            onChange={onInputChange}
          />
        </div>
        <div className="my-5 ">
          <label
            htmlFor="email"
            className="uppercase block text-xl font-bold text-gray-600"
          >
            Email
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
        <div className="my-5 ">
          <label
            htmlFor="password"
            className="uppercase block text-xl font-bold text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-500"
            value={password}
            name="password"
            onChange={onInputChange}
          />
        </div>
        <div className="my-5 ">
          <label
            htmlFor="password2"
            className="uppercase block text-xl font-bold text-gray-600"
          >
            Repetir password
          </label>
          <input
            type="password"
            id="password2"
            placeholder="Repita su password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-500"
            value={password2}
            name="password2"
            onChange={onInputChange}
          />
        </div>
        <input
          type="submit"
          value="Crea tu cuenta"
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
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvidé mi password.
        </Link>
      </nav>
    </>
  );
};
