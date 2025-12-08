"use client";
import React, { useState } from 'react'
import Button from '../...components/Button';
import Link from 'next/link';
import Input from '../...components/Input';



export default function Login() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = () => {

    };


    return (
        <div className="flex min-h-screen justify-center bg-[url(/LandingFond.jpg)] bg-cover font-sans ">
            <div className="h-225 w-200 pt-10 flex flex-col justify-around items-center">
                <h1 className="text-white text-7xl font-bold">Fight Connect</h1>
                <text className="text">Less headaches, more fights! Find fighters or fighting events fast and safely...</text>
                <div className="mb-40 h-80 w-100 flex flex-col justify-around items-center rounded-lg bg-gray-950/95">
                    <Input className="h-10 w-70" label={"Username"} placeholder={"Enter Username"} value={username} onChange={setUsername}></Input>
                    <Input className="h-10 w-70" label={"Password"} placeholder={"Enter password"} value={password} onChange={setPassword} type="password"></Input>
                    <Link href={"/events"}>
                        <Button onClick={() => handleLogin()} className="h-10 w-70">Login</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


