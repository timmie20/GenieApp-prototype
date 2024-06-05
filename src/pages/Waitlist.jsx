import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import WaitlistNav from "@/components/WaitlistNav";
import lamp from "../assets/images/genie lamp.png";
import { toast } from "sonner";
import SuccessCheck from "@/components/SuccessCheck";
import Loader from "@/components/Loader";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;

  const sendWelcomeEmail = async () => {
    const options = {
      method: "POST",
      url: "https://api.brevo.com/v3/smtp/email",
      headers: {
        accept: "application/json",
        "api-key": apiKey ?? "",
        "content-type": "application/json",
      },
      data: {
        sender: {
          name: "Genie App",
          email: "mygenieweb@gmail.com",
        },
        to: [{ name: name, email: email }],
        htmlContent: `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
              rel="stylesheet"
            />
            <title>Thank You for Joining our Waitlist!</title>
            <style>
              body {
                font-family: "Inter", sans-serif;
              }
            </style>
          </head>
          <body>
            <div>
              <h1>Joined Waitlist</h1>
              <img
                src="https://img.mailinblue.com/7710089/images/content_library/original/6658a1bb6805a2ffb480bbd3.png"
                alt="genie lamp logo"
                style="max-width: 50%; height: auto"
              />
              <p>
                Hey ${name}, Thank you for joining the waitlist for Genie! We're
                absolutely thrilled to have you on board. Genie is all about making
                every moment magical. We are currently in development so keep an eye on your inbox for
                updates on our progress, your patience and support mean the world to us!
                🪄
              </p>
            </div>
          </body>
        </html>
        `,
        subject: "Thank you for joining our waitlist",
        replyTo: { email: "mygenieweb@gmail.com", name: "Genie App" },
      },
    };
    try {
      await axios.request(options);
    } catch (error) {
      return;
    }
  };

  const joinWaitlist = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      url: "https://api.brevo.com/v3/contacts",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey ?? "",
      },
      data: {
        attributes: { FIRSTNAME: name },
        email: email,
        listIds: [7],
        updateEnabled: false,
      },
    };

    try {
      setLoading(true);
      await axios.request(options);
      sendWelcomeEmail();
      setSuccess(true);
    } catch (error) {
      toast("Unable to join waitlist", {
        description: "Check network or Contact might already exist",
      });
    } finally {
      setLoading(false);
      setEmail("");
      setName("");
    }
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-b from-[#1753F5] from-60% to-white">
        <WaitlistNav />
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-[646px] flex-col items-center text-wrap text-center text-white">
            <h1 className="text-[56px] font-semibold leading-none md:text-[64px]">
              Where your wishes get granted
            </h1>
            <form className="w-full max-w-[421px] px-3" onSubmit={joinWaitlist}>
              <p className="my-8 text-wrap text-lg md:text-base">
                The genie app allows you make wishes that can be granted by
                anybody on the app.
              </p>
              <Input
                className="h-[50px] rounded-full border-none bg-white/[13%] px-9 py-4 font-Inter text-base text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-transparent"
                placeholder="Your name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Input
                className="my-[10px] h-[50px] rounded-full border-none bg-white/[13%] px-9 py-4 font-Inter text-base text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-transparent"
                placeholder="example@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                className={`inline-flex w-full items-center justify-center rounded-full px-9 py-4 text-base text-[#1753F5] disabled:pointer-events-none ${success ? "bg-green-400 disabled:opacity-100" : "bg-white disabled:bg-opacity-75"}`}
                type="submit"
                disabled={!name || !email || loading || success}
              >
                {loading ? (
                  <Loader size="25" color="#1753F5" stroke="2" />
                ) : success ? (
                  <SuccessCheck />
                ) : (
                  "Join the waitlist"
                )}
              </button>
            </form>
            <img src={lamp} alt="image of wishing lamp" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Waitlist;
