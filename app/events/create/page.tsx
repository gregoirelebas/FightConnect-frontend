"use client";
import React, { useState } from "react";
import Input from "../../...components/Input";
import RadioButton from "../../...components/RadioButton";
import TextArea from "../../...components/TextArea";
import { Experience, Level, Sport, Weight } from "../../...types/enum";
import Dropdown from "../../...components/Dropdown";
import Button, { ButtonVariant } from "../../...components/Button";
import Link from "next/link";
import router from "next/router";
import { Event } from "@/app/...types/Event";

export default function NewEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [level, setLevel] = useState<Level>(Level.Amateur);
  const [date, setDate] = useState<string>("2025-11-");
  const [club, setClub] = useState<string>("");
  const [sport, setSport] = useState<Sport[]>([]);
  const [experience, setExperience] = useState<string>("");
  const [weight, setWeight] = useState<Weight>(Weight.FiftyTwoFiftySeven);
  const [description, setDescription] = useState<string>("");
  const [promoterId, setPromoterId] = useState<string>("693ac337db89e719499d49ee");
  const [fighters, setFighters] = useState<string[]>([]);

  const createEvent = async () => {
    const event: Event = {
      level: level,
      sports: sport,
      clubName: club,
      date: date,
      experience: experience,
      weight: weight,
      name: eventName,
      description: description,
      promoterId: promoterId,
      fighters: fighters,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    };

    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + "events/create", options).then(
      (response) => response.json()
    );

    if (result.result) {
      console.log("Successfully added");
      router.push("/events");
    } else {
      console.error("Error", result.error);
    }
  };

  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] text font-sans ">
      <div className="h-full mt-3 mb-3 w-250 border-gray-500 border-3 bg-red-500/10 rounded-4xl flex flex-col justify-around items-center">
        <div className="flex flex-row items-center">
          <h1 className="font-bold ml-60">Create a New Event</h1>
          <Link href="/dashboard/promoter">
            {" "}
            <Button className="w-25 h-10 text-sm ml-35" variant={ButtonVariant.Refuse}>
              Go Back
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-around items-center h-2/5">
          <div className="h-15 flex flex-col justify-between">
            <span>Level :</span>
            <div className="flex flex-row w-50 justify-between">
              <RadioButton
                name="level"
                label="Pro"
                value={Level.Pro}
                onChange={(value) => setLevel(value as Level)}
              ></RadioButton>
              <RadioButton
                name="level"
                label="Amateur"
                value={Level.Amateur}
                onChange={(value) => setLevel(value as Level)}
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
              type="date"
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
                onChange={(value) => setSport([value as Sport])}
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
                onChange={(value) => setExperience(String(value))}
              ></Dropdown>
            </div>
            <div className="h-20 flex flex-col justify-between">
              <span>Weight :</span>
              <Dropdown
                className="w-50"
                options={[
                  { value: Weight.FiftyTwoFiftySeven, label: "52-57" },
                  { value: Weight.FiftySevenSixtyOne, label: "57-61" },
                  { value: Weight.SixtyOneSixtySix, label: "61-66" },
                  { value: Weight.SixtySixSeventy, label: "66-70" },
                  { value: Weight.SeventySeventySeven, label: "70-77" },
                  { value: Weight.SeventySevenEightyFour, label: "77-84" },
                  { value: Weight.EightyFourNinetyThree, label: "84-93" },
                  { value: Weight.NinetyThreeOneHundredTwenty, label: "93-120" },
                ]}
                onChange={(value) => setWeight(value as Weight)}
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
        <Button variant={ButtonVariant.Accept} onClick={() => createEvent()}>
          Add Event
        </Button>
      </div>
    </div>
  );
}
