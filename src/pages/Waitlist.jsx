import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
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
                every moment magical. While we're hard at work developing it, we can't
                wait to bring you this powerful tool that will give you the ability to
                make wishes without having a magical lamp. Keep an eye on your inbox for
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

    setLoading(true);

    try {
      await axios.request(options);
      sendWelcomeEmail();
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setEmail("");
      setName("");
    }
  };

  return (
    <form onSubmit={joinWaitlist}>
      <Input
        type="email"
        className="w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        className="w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">join</Button>
    </form>
  );
};

export default Waitlist;
