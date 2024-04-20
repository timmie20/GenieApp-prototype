import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateWish = () => {
  return (
    <>
      <form
        className="mx-auto my-5 flex w-full max-w-[500px] flex-col justify-center gap-5"
        autoComplete="off"
      >
        <div className="w-full">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <Input placeholder="Name" type="text" id="name" />
        </div>
        <div className="w-full gap-1.5">
          <label htmlFor="wish" className="text-sm">
            Your Message
          </label>
          <Textarea placeholder="Type your wish here." id="wish" />
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
