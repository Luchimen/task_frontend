import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ConfirmAccount,
  ForgetPassword,
  LoginPage,
  NewPassword,
  RegisterPage,
} from "./auth/pages";
import { AuthProvider, ProyectosProvider } from "./context/";
import { AuthLayout, RutaProtegida } from "./layouts";
import {
  EditarProyecto,
  NuevoColaborador,
  NuevoProyecto,
  Proyecto,
  Proyectos,
} from "./proyectos/pages";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<LoginPage />} />
              <Route path="registrar" element={<RegisterPage />} />
              <Route path="olvide-password" element={<ForgetPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route
                path="nuevo-colaborador/:id"
                element={<NuevoColaborador />}
              />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
