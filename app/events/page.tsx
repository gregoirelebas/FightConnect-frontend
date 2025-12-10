"use client";
import React, { useState } from "react";
import Input from "../...components/Input";
import Button, { ButtonVariant } from "../...components/Button";
import Event from "./event";
import RadioButton from "../...components/RadioButton";
import Dropdown from "../...components/Dropdown";
import { Sport, Level, Experience } from "../...types/enum";

export default function Events() {
  const [search, setSearch] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] text font-sans ">
      <div className="h-1/10 ml-4 flex flex-row items-center">
        <div className="w-1/5"></div>
        <Input
          className="w-200 h-10"
          label={"You can search here :"}
          placeholder={"Search an event"}
          value={search}
          onChange={value => setSearch(String(value))}
        ></Input>
        <Button
          variant={ButtonVariant.Primary}
          className="h-10 w-40 ml-80 mt-8 flex justify-center items-center"
        >
          Search
        </Button>
      </div>
      <div className="h-9/10 flex flex-row">
        <div className="w-1/5 pt-2 pl-3 mb-5 ml-2 mr-1 mt-2 border border-gray-600 rounded-3xl">
          <h3>Filter</h3>
          <div className="h-15 mt-10 flex flex-col justify-between">
            <span>Level :</span>
            <div className="flex flex-row w-50 justify-between">
              <RadioButton
                name="level"
                label="Pro"
                value={Level.Pro}
                onChange={setLevel}
              ></RadioButton>
              <RadioButton
                name="level"
                label="Amateur"
                value={Level.Amateur}
                onChange={setLevel}
              ></RadioButton>
            </div>
          </div>
          <div className="h-20 mt-8 flex flex-col justify-between">
            <span>Sports :</span>
            <Dropdown
              className="w-50"
              options={[
                { value: Sport.MMA, label: "MMA" },
                { value: Sport.KickBoxing, label: "Kick Boxing" },
                { value: Sport.Jiujitsu, label: "Jiu Jitsu" },
                { value: Sport.MuayThai, label: "Muay Thai" },
                { value: Sport.EnglishBoxing, label: "English Boxing" },
              ]}
            ></Dropdown>
          </div>
          <div className="h-20 mt-8 flex flex-col justify-between">
            <span>Experience :</span>
            <Dropdown
              className="w-50"
              options={[
                { value: Experience.Zero, label: "0" },
                { value: Experience.OneThree, label: "1-3" },
                { value: Experience.FourSix, label: "4-6" },
                { value: Experience.SevenNine, label: "7-9" },
                { value: Experience.TenTwelve, label: "10-12" },
                { value: Experience.ThirteenFifteen, label: "13-15" },
                { value: Experience.SixteenEighteen, label: "16-18" },
                { value: Experience.NineteenTwentyOne, label: "19-21" },
                { value: Experience.TwentyTwoTwentyFour, label: "22-24" },
                { value: Experience.TwentyFivePlus, label: "25+" },
              ]}
            ></Dropdown>
          </div>
          <div className="h-20 mt-8 flex flex-col justify-between">
            <span>Min Weight :</span>
            <Dropdown className="w-50" options={[{ value: "figth", label: "1" }]}></Dropdown>
          </div>
          <div className="h-20 mt-8 flex flex-col justify-between">
            <span>Max Weight :</span>
            <Dropdown className="w-50" options={[{ value: "figth", label: "1" }]}></Dropdown>
          </div>
          <Button
            variant={ButtonVariant.Primary}
            className="h-10 w-40 mt-10 flex justify-center items-center"
          >
            Apply
          </Button>
        </div>
        <div className="w-4/5 pl-3 mb-5 ml-1 mr-2 mt-2 flex flex-col border border-gray-600 rounded-3xl">
          <h3 className="w-full">Events</h3>
          <div className="flex flex-wrap">
            {/* <Event /> */}
            </div>
        </div>
      </div>
    </div>
  );
}
