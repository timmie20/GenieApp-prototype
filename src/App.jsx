import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import CreateWish from "./pages/CreateWish";
import Feeds from "./pages/Feeds";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<CreateWish />} />
            <Route path="feeds" element={<Feeds />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </>
  );
};

export default App;
