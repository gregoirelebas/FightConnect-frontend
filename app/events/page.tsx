"use client";
import React, { useState } from 'react'
import Input from '../...components/Input';
import Button from '../...components/Button';
import Event from './event';


export default function Events() {

    const [search, setSearch] = useState<string>('')


    return (
        <div className="flex flex-col h-[calc(100vh-80px)] text font-sans ">
            <div className="h-1/10 ml-4 flex flex-row items-center">
                <div className="w-1/5"></div>
                <Input className="w-200 h-10" label={"You can search here :"} placeholder={"Search an event"} value={search} onChange={setSearch} ></Input>
                <Button className="h-10 w-40 ml-80 mt-8 flex justify-center items-center">Search</Button>
            </div>
            <div className="h-9/10 flex flex-row">
                <div className='w-1/5 pl-3 mb-5 ml-2 mr-1 mt-2 border border-gray-600 rounded-3xl'><text>Filter</text></div>
                <div className='w-4/5 pl-3 mb-5 ml-1 mr-2 mt-2 flex flex-col border border-gray-600 rounded-3xl'>
                    <text className="w-full">Events</text>
                    <div className="flex flex-wrap">
                        {/* <Event /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
