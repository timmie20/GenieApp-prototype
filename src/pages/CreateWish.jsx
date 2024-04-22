import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

const CreateWish = () => {
  const [name, setName] = useState("");
  const [wishDesc, setWishDesc] = useState("");
  const { createWishPost } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Sign in to create a post");
    } else {
      try {
        await createWishPost(name, wishDesc);
      } catch (error) {
        console.log(error.message);
      } finally {
        setName("");
        setWishDesc("");
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
        <div className="w-full">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <Input
            placeholder="Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full gap-1.5">
          <label htmlFor="wish" className="text-sm">
            Your Message
          </label>
          <Textarea
            placeholder="Make your wish here."
            id="wish"
            value={wishDesc}
            onChange={(e) => setWishDesc(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Your message will be copied to the support team.
          </p>
        </div>
        <Button type="submit">create</Button>
      </form>
    </>
  );
};

export default CreateWish;
