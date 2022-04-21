import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { GamesProvider } from "./context/GamesProvider";

import AtuhLayout from "./layouts/AtuhLayout";
import Confirm from "./pages/Confirm";
import Login from "./pages/Login";
import NewPass from "./pages/NewPass";
import ResetPass from "./pages/ResetPass";
import SignUp from "./pages/Signup";

import RutaProtegida from "./layouts/RutaProtegida";
import Games from "./pages/Games";
import TwichGames from "./pages/TwichGames";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GamesProvider>
          <Routes>
            <Route path="/" element={<AtuhLayout />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="reset-pass" element={<ResetPass />} />
              <Route path="reset-pass/:token" element={<NewPass />} />
              <Route path="confirm/:token" element={<Confirm />} />
            </Route>
            <Route path="games" element={<RutaProtegida />}>
              <Route index element={<Games />} />
              <Route path="twich-Games" element={<TwichGames />}></Route>
            </Route>
          </Routes>
        </GamesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
