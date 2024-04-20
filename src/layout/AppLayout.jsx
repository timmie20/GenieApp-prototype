import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="mx-auto max-w-[60%]">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
