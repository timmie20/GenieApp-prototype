import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import CreateWish from "./pages/CreateWish";
import Feeds from "./pages/Feeds";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CreateWish />} />
          <Route path="feeds" element={<Feeds />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
