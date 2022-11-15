import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import { Alerta } from "../../helpers/Alerta";
import { useForm } from "../../hooks/useForm";
const initialValue = {
  password: "",
};
export const NewPassword = () => {
  const [alerta, setAlerta] = useState({});
  const { password, onInputChange, onResetForm } = useForm(initialValue);
  const { token } = useParams();
  const url = `/usuarios/olvide-password/${token}`;

  useEffect(() => {
    const verificarToken = async () => {
      try {
        await clienteAxios.get(url);
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg,
          ok: error.response.data.ok,
        });
      }
    };
    verificarToken();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (password === "" || password.length < 6) {
      setAlerta({
        error: true,
        msg: "El password debe tener al menos 6 caracteres",
      });
    }
    try {
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        error: false,
        msg: data.msg,
        ok: data.ok,
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
        Reestablece tu password y no pierdas acceso a tus
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form
        className={`${
          alerta.ok === false && "hidden"
        } my-10 bg-white shadow rounded-lg px-10 py-10`}
        onSubmit={submitForm}
      >
        <div className="my-5 ">
          <label
            htmlFor="password"
            className="uppercase block text-xl font-bold text-gray-600"
          >
            Ingresa tu nuevo password
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
          value="Reestablece tu contraseña"
          className={`${
            alerta.ok && "hidden"
          } w-full bg-sky-700 py-3 rounded text-white text-xl cursor-pointer hover:bg-sky-800 transition-colors font-bold mb-5`}
          disabled={alerta.ok}
        />
        {alerta.error === false && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-1xl mt-5"
          >
            Inicia sesión con tu nueva contraseña
          </Link>
        )}
      </form>
      {alerta.msg && <Alerta alerta={alerta} />}
    </>
  );
};
