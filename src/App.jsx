import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CasaCompleta } from "./Modelos/CasaCompleta";
import { Login } from './Login/Login'

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
      </Routes>
    </BrowserRouter>
  );
}
