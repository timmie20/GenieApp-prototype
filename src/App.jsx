import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { AppContextProvider } from "./context/AppContext";
import { AuthContextProvider } from "./context/AuthContext";
import AppLayout from "./layout/AppLayout";
const CreateWish = lazy(() => import("./pages/CreateWish"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
import Feeds from "./pages/Feeds";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<Waitlist />} />
            <Route path="/demo" element={<AppLayout />}>
              <Route index element={<CreateWish />} />
              <Route path="/demo/feeds" element={<Feeds />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
