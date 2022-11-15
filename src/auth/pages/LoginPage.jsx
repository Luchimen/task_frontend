import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import { Alerta } from "../../helpers/Alerta";
import useAuth from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
const initialValue = {
  email: "",
  password: "",
};
export const LoginPage = () => {
  const { email, password, onInputChange, onResetForm } = useForm(initialValue);
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const submitForm = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        error: true,
        msg: "Los campos deben estar completos",
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });

      localStorage.setItem("x-token", data.token);
      delete data.ok;
      delete data.msg;
      setAuth(data);
      navigate("/proyectos", { replace: true });
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
        Inicia sesión y administra tus
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
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-500"
            name="email"
            value={email}
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
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </div>
        <input
          type="submit"
          value="INICIAR SESION"
          className="w-full bg-sky-700 py-3 rounded text-white text-xl cursor-pointer hover:bg-sky-800 transition-colors font-bold mb-5"
        />
      </form>
      {alerta.msg && <Alerta alerta={alerta} />}
      <nav className="lg:flex lg:justify-between">
        <Link
          to="registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          to="olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Olvide mi password.
        </Link>
      </nav>
    </>
  );
};
