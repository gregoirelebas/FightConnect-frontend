"use client";
import React, { useState } from "react";
import Input from "../...components/Input";
import RadioButton from "../...components/RadioButton";
import TextArea from "../...components/TextArea";
import { Experience, Level, MaxWeight, MinWeight, Sport } from "../...types/enum";
import Dropdown from "../...components/Dropdown";
import Button, { ButtonVariant } from "../...components/Button";
import Link from "next/link";

export default function NewEvent() {
  const [eventName, setEventName] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
  const [club, setClub] = useState("");

  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] text font-sans ">
      <div className="h-full mt-3 mb-3 w-250 bg-accent/30 rounded-4xl flex flex-col justify-around items-center">
        <div className="flex flex-row items-center">
          <h1 className="font-bold ml-60">Create a New Event</h1>
         <Link href="/dashboard"> <Button className="w-25 h-10 text-sm ml-35"  variant={ButtonVariant.Refuse}>Go Back</Button></Link>
        </div>
        <div className="flex flex-col justify-around items-center h-2/5">
          <div className="h-15 flex flex-col justify-between">
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
          <div className="flex flex-wrap w-230 h-7/10 mt-10 justify-around">
            <Input
              label="Event Name"
              placeholder="Event Name..."
              type="text"
              value={eventName}
              onChange={(value) => setEventName(String(value))}
            />
            <Input
              label="Date"
              placeholder="Enter Date Event"
              type="text"
              value={date}
              onChange={(value) => setDate(String(value))}
            />
            <Input
              label="Club"
              placeholder="name Club"
              type="text"
              value={club}
              onChange={(value) => setClub(String(value))}
            />
            <div className="h-20 flex flex-col justify-between">
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
            <div className="h-20 flex flex-col justify-between">
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
            <div className="h-20 flex flex-col justify-between">
              <span>Min Weight :</span>
              <Dropdown
                className="w-50"
                options={[
                  { value: MinWeight.Eighty, label: "50" },
                  { value: MinWeight.FiftyFive, label: "55" },
                  { value: MinWeight.Sixty, label: "60" },
                  { value: MinWeight.SixtyFive, label: "65" },
                  { value: MinWeight.Seventy, label: "70" },
                  { value: MinWeight.SeventyFive, label: "75" },
                  { value: MinWeight.Eighty, label: "80" },
                  { value: MinWeight.EightyFive, label: "85" },
                ]}
              ></Dropdown>
            </div>
            <div className="h-20 flex flex-col justify-between">
              <span>Max Weight :</span>
              <Dropdown
                className="w-50"
                options={[
                  { value: MaxWeight.Sixty, label: "60" },
                  { value: MaxWeight.SixtyFive, label: "65" },
                  { value: MaxWeight.Seventy, label: "70" },
                  { value: MaxWeight.SeventyFive, label: "75" },
                  { value: MaxWeight.Eighty, label: "80" },
                  { value: MaxWeight.EightyFive, label: "85" },
                  { value: MaxWeight.Ninety, label: "90" },
                  { value: MaxWeight.NinetyFive, label: "95" },
                  { value: MaxWeight.Hundred, label: "100" },
                ]}
                
              ></Dropdown>
            </div>
          </div>
        </div>
        <div className="w-200">
          <TextArea
            label="Description"
            placeholder="Write some words about you..."
            value={description}
            className="w-full"
            onChange={setDescription}
          />
        </div>
        <Button variant={ButtonVariant.Accept}>Add Event</Button>
      </div>
    </div>
  );
}
