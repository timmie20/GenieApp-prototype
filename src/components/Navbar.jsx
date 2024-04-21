import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

const Navbar = () => {
  const { signIn } = useContext(AppContext);
  return (
    <>
      <div className="flex h-fit items-center justify-between py-3">
        <h3 className="text-3xl">Genie</h3>
        <div className="space-x-3">
          <Button asChild variant="link">
            <Link to="/">Create wish</Link>
          </Button>

          <Button asChild variant="link">
            <Link to="/feeds">Feeds</Link>
          </Button>

          <Button onClick={signIn}>sign in</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
