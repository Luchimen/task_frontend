import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alerta } from "../../helpers/Alerta";
import clienteAxios from "../../config/clienteAxios";

export const ConfirmAccount = () => {
  const [alerta, setAlerta] = useState({});
  const { id } = useParams();
  useEffect(() => {

    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/usuarios/confirmar/${id}`);
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
    confirmarCuenta();
  }, []);

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">
        Tu cuenta ya fue comprobada, comienza a crear tus
        <span className="text-slate-700">proyectos</span>
      </h1>
      <div className="bg-white p-4 mt-5 md:mt-10 rounded-lg shadow ">
        <Alerta alerta={alerta} />
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-1xl mt-5"
        >
          Inicia sesión.
        </Link>
      </div>
    </>
  );
};
