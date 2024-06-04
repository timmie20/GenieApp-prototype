import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

const CreateWish = () => {
  const [wishDesc, setWishDesc] = useState("");
  const { createWishPost } = useContext(AppContext);
  const { userAccountData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  console.log("hello");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userAccountData) {
      console.log("Sign in to create a post");
    } else {
      try {
        await createWishPost(wishDesc);
      } catch (error) {
        console.log(error.message);
      } finally {
        setWishDesc("");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <form
        className="mx-auto my-5 flex w-full max-w-[500px] flex-col justify-center gap-5"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="w-full gap-1.5">
          <label htmlFor="wish" className="text-sm">
            Make your wish here
          </label>
          <Textarea
            placeholder="I wish for..."
            id="wish"
            value={wishDesc}
            onChange={(e) => setWishDesc(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Your message will be copied to the support team.
          </p>
        </div>
        <Button type="submit" size="lg">
          {!loading ? "Create" : "Creating Wish"}
        </Button>
      </form>
    </>
  );
};

export default CreateWish;
