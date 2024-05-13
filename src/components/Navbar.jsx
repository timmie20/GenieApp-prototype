import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { signInWithGoogle, logOut } = useContext(AuthContext);
  return (
    <>
      <div className="flex h-fit items-center justify-between py-3">
        <h3 className="text-3xl">Genie</h3>

        <div>
          <Button asChild variant="link">
            <Link to="/">Create wish</Link>
          </Button>

          <Button asChild variant="link">
            <Link to="/feeds">Feeds</Link>
          </Button>
        </div>

        <div className="flex gap-2">
          {/* <Button onClick={signInAnonymous} size="sm">
            sign in as anonymous
          </Button> */}

          <Button onClick={signInWithGoogle} size="lg">
            sign in with google
          </Button>

          <Button onClick={logOut} size="lg">
            sign out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
