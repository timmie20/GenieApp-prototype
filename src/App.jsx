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
            <Route path="/" element={<AppLayout />}>
              <Route index element={<CreateWish />} />
              <Route path="feeds" element={<Feeds />} />
            </Route>
            <Route path="/waitlist" element={<Waitlist />} />
          </Routes>
        </AppContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
