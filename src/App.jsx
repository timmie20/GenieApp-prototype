import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import CreateWish from "./pages/CreateWish";
import Feeds from "./pages/Feeds";
import { AppContextProvider } from "./context/AppContext";
import { AuthContextProvider } from "./context/AuthContext";
import Waitlist from "./pages/Waitlist";

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
