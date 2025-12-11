"use client";

import { useState } from "react";
import Button, { ButtonVariant } from "../...components/Button";
import Link from "next/link";
import Input from "../...components/Input";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    };

    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + "users/signin", options).then(
      (response) => response.json()
    );

    if (result.result) {
      console.log("Successfully Login");
      router.push("/events");
    } else {
      console.error("Error login", result.error);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-[url(/LandingFond.jpg)] bg-cover font-sans ">
      <div className="h-225 w-250 pt-7 flex flex-col justify-around items-center">
        <h1 className="text-white pt-3 ml-65 w-180 text-7xl font-bold">Fight Connect</h1>

        <h3 className="pb-2 mb-2">
          Less headaches, more fights! Find fighters or fighting events fast and safely...
        </h3>
        <div className="mb-45 h-80 w-100 flex flex-col justify-around items-center rounded-lg bg-background">
          <Link href={"/"}>
            <p className="font-bold text-xl ml-85">X</p>
          </Link>
          <Input
            className="w-xs"
            label={"Username"}
            placeholder={"Username..."}
            value={name}
            onChange={(value) => setName(String(value))}
          ></Input>
          <Input
            className="w-xs"
            label={"Password"}
            placeholder={"Password..."}
            value={password}
            onChange={(value) => setPassword(String(value))}
            type="password"
          ></Input>
          <Button variant={ButtonVariant.Primary} onClick={() => handleLogin()} className="w-xs">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
