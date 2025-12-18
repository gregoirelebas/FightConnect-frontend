'use client';

import { useEffect, useState } from 'react';
import Input from '../...components/Input';
import Button, { ButtonVariant } from '../...components/Button';
import type { Event } from '@/app/...types/Event';
import EventComponent from './event';
import RadioButton from '../...components/RadioButton';
import Dropdown from '../...components/Dropdown';
import { Sport, Level, Experience, Weight } from '../...types/enum';
import PopUpEvent from './PopUpEvent';
import SportDropdown from '../...UI/SportDropdown';
import { LevelToString, SportToString } from '../...helpers/enum';

export default function EventsPage() {
  const [search, setSearch] = useState<string>('');
  const [level, setLevel] = useState<Level>(Level.Amateur);
  const [sport, setSport] = useState<Sport>(Sport.Empty);
  const [experience, setExperience] = useState<Experience>(Experience.Empty);
  const [weight, setWeight] = useState<Weight>(Weight.Empty);
  const [allEvents, setAllEvents] = useState([]);
  const [eventShow, setEventShow] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "events/")
      .then((response) => response.json())
      .then((request) => {
        if (request.result) {
          setAllEvents(request.data);
          setEventShow(request.data);
        } else {
          console.error('Error registering fighter:', request.error);
        }
      });
  }, []);

  const cardEvents = eventShow.map((data: Event, i) => {
    return (
      <EventComponent
        key={i}
        token={data.token}
        name={data.name}
        date={data.date}
        sport={SportToString(data.sport)}
        experience={data.experience}
        weight={data.weight}
        level={data.level}
        setCurrentEvent={setCurrentEvent}
        setIsPopUp={setIsPopUp}
      />
    );
  });

  const handleSearch = () => {
    const research = allEvents.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    );
    setEventShow(research);
  };

  const applyFilter = () => {
    let research = allEvents.filter((data) => data.level === level);

    if (sport !== Sport.Empty) {
      research = research.filter((data) => data.sport === sport);
    }

    if (experience !== Experience.Empty) {
      research = research.filter((data) => data.experience === experience);
    }

    if (weight !== Weight.Empty) {
      research = research.filter((data) => data.weight === weight);
    }

    setEventShow(research);
  };

  const resetFilter = () => {
    setEventShow(allEvents);
    setSport(Sport.Empty);
    setExperience(Experience.Empty);
    setWeight(Weight.Empty);
  };

  return (
    <>
      <div className="flex flex-col w-full h-[calc(100vh-80px)] items-center text font-sans overflow-auto ">
        <div className="w-330 min-h-40 flex flex-col items-start justify-center-safe">
          <h1>Search Events</h1>
          <p>Find the perfect fighting event for your skills and weight class</p>
        </div>
        <div className="card w-330 flex-row items-center p-6 mb-6">
          <Input
            className="w-250 h-10"
            label={""}
            placeholder={"Search an event by name"}
            value={search}
            onChange={(value) => setSearch(String(value))}
          />
          <Button
            variant={ButtonVariant.Primary}
            className="h-10 w-40 ml-20 flex justify-center items-center"
            onClick={() => handleSearch()}
          >
            Search
          </Button>
        </div>
        <div className="card w-330 min-h-55 flex-col justify-around">
          <div className="flex flex-row justify-between item-center">
            <h3 className="w-35">Filter</h3>
            <div className="h-12 w-105 flex flex-row justify-around items-center">
              <span className="whitespace-nowrap">Level :</span>
              <div className="flex flex-row justify-around w-110">
                <div className="h-10 w-40 bg-foreground border rounded-2xl flex items-center justify-center">
                  <RadioButton
                    name="level"
                    label="Pro"
                    value={Level.Pro}
                    onChange={(value) => setLevel(value as Level)}
                  />
                </div>
                <div className="h-10 w-40 bg-foreground border rounded-2xl flex items-center justify-center">
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
            <div className="flex flex-row w-85 justify-around ">
              <Button
                variant={ButtonVariant.Primary}
                className="h-10 w-40 flex justify-center items-center"
                onClick={() => applyFilter()}
              >
                Apply
              </Button>
              <Button
                variant={ButtonVariant.Ternary}
                className="h-10 w-40 flex justify-center items-center"
                onClick={() => resetFilter()}
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <div className="h-20 flex flex-col justify-between">
              <span>Sports :</span>
              <SportDropdown className="w-50" onChange={(value) => setSport(value as Sport)} />
            </div>
            <div className="h-20 flex flex-col justify-between">
              <span>Experience Required :</span>
              <Dropdown
                className="w-50"
                options={[
                  { value: Experience.Empty, label: '-' },
                  { value: Experience.Zero, label: '0' },
                  { value: Experience.OneThree, label: '1-3' },
                  { value: Experience.FourSix, label: '4-6' },
                  { value: Experience.SevenNine, label: '7-9' },
                  { value: Experience.TenTwelve, label: '10-12' },
                  { value: Experience.ThirteenFifteen, label: '13-15' },
                  { value: Experience.SixteenEighteen, label: '16-18' },
                  { value: Experience.NineteenTwentyOne, label: '19-21' },
                  { value: Experience.TwentyTwoTwentyFour, label: '22-24' },
                  { value: Experience.TwentyFivePlus, label: '25+' },
                ]}
                onChange={(value) => setExperience(value as Experience)}
              />
            </div>
            <div className="h-20 flex flex-col justify-between">
              <span>Weight Class :</span>
              <Dropdown
                className="w-50"
                options={[
                  { value: Weight.Empty, label: '-' },
                  { value: Weight.FiftyTwoFiftySeven, label: '52-57' },
                  { value: Weight.FiftySevenSixtyOne, label: '57-61' },
                  { value: Weight.SixtyOneSixtySix, label: '61-66' },
                  { value: Weight.SixtySixSeventy, label: '66-70' },
                  { value: Weight.SeventySeventySeven, label: '70-77' },
                  { value: Weight.SeventySevenEightyFour, label: '77-84' },
                  { value: Weight.EightyFourNinetyThree, label: '84-93' },
                  { value: Weight.NinetyThreeOneHundredTwenty, label: '93-120' },
                ]}
                onChange={(value) => setWeight(value as Weight)}
              />
            </div>
          </div>
        </div>
        <span className="flex justify-around items-center min-h-15 w-40 mr-290">Found <span className="text-accent">{eventShow.length}</span> Events :  </span>
        <div className="w-330">
          <div className="grid grid-cols-3">{cardEvents}{cardEvents}{cardEvents}</div>
        </div>
      </div>

      {isPopUp && <PopUpEvent setIsPopUp={setIsPopUp} token={currentEvent} />}
    </>
  );
}
