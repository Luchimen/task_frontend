export const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "from-red-400 to-red-600" : "from-sky-400 to-sky-600"
      } bg-gradient-to-tr text-center p-3 rounded-xl uppercase text-white mt-8 font-bold`}
    >
      {alerta.msg}
    </div>
  );
};
