"use client";

import { useEffect, useState } from "react";
import Input from "../../...components/Input";
import RadioButton from "../../...components/RadioButton";
import TextArea from "../../...components/TextArea";
import { Experience, Level, Sport, Weight } from "../../...types/enum";
import Dropdown from "../../...components/Dropdown";
import Button, { ButtonVariant } from "../../...components/Button";
import Link from "next/link";
import SportDropdown from "@/app/...UI/SportDropdown";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/...helpers/cookies";
import { getFormatedDateNewEvent } from "@/app/...helpers/date";
import { Event } from '@/app/...types/Event';

export default function NewEvent() {
  const router = useRouter();

  const [eventName, setEventName] = useState<string>("");
  const [level, setLevel] = useState<Level>(Level.Amateur);
  const [date, setDate] = useState<Date>(new Date());
  const [club, setClub] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [sport, setSport] = useState<Sport>(Sport.EnglishBoxing);
  const [experience, setExperience] = useState<Experience>(Experience.Zero);
  const [weight, setWeight] = useState<Weight>(Weight.FiftyTwoFiftySeven);
  const [description, setDescription] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const createEvent = async () => {
    const event: Event = {
      level: level,
      city: city,
      sport: sport,
      clubName: club,
      date: date.toString(),
      experience: experience,
      weight: weight,
      name: eventName,
      description: description,
      promoterToken: token,
      fighters: [],
      token: "",
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

  useEffect(() => {
    const fetchCookie = async () => {
      const result = await getCookie("date");
      if (result) {
        setDate(new Date(result));
      }
      const token = await getCookie("token");
      if (token) {
        setToken(token);
      }
    };
    fetchCookie();
  }, []);

  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] bg-[url(/createRing.png)] bg-center bg-cover text-white font-sans ">
      <div className="h-full w-1/2 bg-foreground/98 flex flex-col font-bold justify-around items-center">
        <div className="flex flex-row h-1/6 w-full items-center justify-center border-2 border-l-0 border-r-0 border-t-0">
          <div className="flex flex-col mr-50">
            <h1>Create an Event</h1>
            <p>Fill in the information to create a new battle event</p>
          </div>
          <Link href="/dashboard">
            {" "}
            <Button className="w-25 h-10 text-sm" variant={ButtonVariant.Refuse}>
              Go Back
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-around items-center h-3/6">
          <div className="h-3/10 w-3/5 flex flex-col justify-center">
            <span>Event Type :</span>
            <div className="flex flex-row mt-3 justify-between">
              <div className="h-12 w-50 bg-foreground border-2 rounded-2xl border-accent flex items-center justify-center">
                <RadioButton
                  name="level"
                  label="Professional"
                  value={Level.Pro}
                  onChange={(value) => setLevel(value as Level)}
                />
              </div>
              <div className="h-12 w-50 bg-foreground border-2 rounded-2xl border-accent flex items-center justify-center">
                <RadioButton
                  name="level"
                  label="Amateur"
                  value={Level.Amateur}
                  isChecked={true}
                  onChange={(value) => setLevel(value as Level)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-rows-3 w-200 h-7/10">
            <Input
              label="Name of Event"
              placeholder="Event Name..."
              type="text"
              value={eventName}
              onChange={(value) => setEventName(String(value))}
            />
            <Input
              className="w-61"
              label="Date of Event"
              placeholder="Enter Date Event"
              type="date"
              value={getFormatedDateNewEvent(date.toString())}
              onChange={(value) => setDate(new Date(value))}
            />
            <Input
              label="Club"
              placeholder="name Club"
              type="text"
              value={club}
              onChange={(value) => setClub(String(value))}
            />
            <Input
              label="City"
              placeholder="City name"
              type="text"
              value={city}
              onChange={(value) => setCity(String(value))}
            />
            <div className="h-20 flex flex-col justify-between">
              <span>Sports :</span>
              <SportDropdown className="w-61" onChange={(value) => setSport(value as Sport)} />
            </div>
            <div className="h-20 flex flex-col justify-between">
              <span>Experience :</span>
              <Dropdown
                className="w-61"
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
                onChange={(value) => setExperience(value as Experience)}
              />
            </div>
            <div className="h-20 flex flex-col justify-between">
              <span>Category of Weight :</span>
              <Dropdown
                className="w-61"
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
              />
            </div>
          </div>
        </div>
        <div className="h-2/6 flex flex-col items-center">
        <div className="w-200">
          <TextArea
            label="Event Description"
            placeholder="Write some words about this event..."
            value={description}
            className="w-full"
            onChange={setDescription}
          />
        </div>
        <Button className="w-100" variant={ButtonVariant.Accept} onClick={() => createEvent()}>
          Create Event
        </Button>
        </div>
      </div>
    </div>
  );
}
