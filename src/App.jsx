import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CasaCompleta } from "./Modelos/CasaCompleta";
import { Login } from './Login/Login'
import Actions from "./Actions/Actions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/Casa"
          element={
            <CasaCompleta/>
          } />
          <Route
            path="/Login"
            element={
              <Login/>
            } />
            <Route
              path="/Actions"
              element={
                <Actions/>
              } />
      </Routes>
    </BrowserRouter>
  );
}
