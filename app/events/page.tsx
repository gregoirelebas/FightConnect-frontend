'use client';

import { useEffect, useState } from 'react';
import Input from '../...components/Input';
import Button, { ButtonVariant } from '../...components/Button';
import type { Event } from '../...types/event';
import EventComponent from './event';
import RadioButton from '../...components/RadioButton';
import Dropdown from '../...components/Dropdown';
import { Sport, Level, Experience, Weight } from '../...types/enum';
import PopUpEvent from './PopUpEvent';

export default function EventsPage() {
  const [search, setSearch] = useState<string>('');
  const [level, setLevel] = useState<Level>(Level.Amateur);
  const [sport, setSport] = useState<Sport>(Sport.EnglishBoxing);
  const [experience, setExperience] = useState<Experience>(Experience.Zero);
  const [weight, setWeight] = useState<Weight>(Weight.FiftyTwoFiftySeven);
  const [allEvents, setAllEvents] = useState([]);
  const [isPopUp, setIsPopUp] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + 'events/search')
      .then((response) => response.json())
      .then((request) => {
        if (request.result) {
          setAllEvents(request.data);
        } else {
          console.error('Error registering fighter:', request.error);
        }
      });
  }, []);

  const cardEvents = allEvents.map((data: Event, i) => {
    return (
      <EventComponent
        key={i}
        token={data.token}
        name={data.name}
        date={data.date}
        sport={data.sport}
        experience={data.experience}
        weight={data.weight}
        level={data.level}
        setCurrentEvent={setCurrentEvent}
        setIsPopUp={setIsPopUp}
      />
    );
  });

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-80px)] text font-sans ">
        <div className="h-1/10 ml-4 flex flex-row items-center">
          <div className="w-1/5"></div>
          <Input
            className="w-200 h-10"
            label={'You can search here :'}
            placeholder={'Search an event'}
            value={search}
            onChange={(value) => setSearch(String(value))}
          />
          <Button
            variant={ButtonVariant.Primary}
            className="h-10 w-40 ml-80 mt-8 flex justify-center items-center">
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
                  onChange={(value) => setLevel(value as Level)}
                />
                <RadioButton
                  name="level"
                  label="Amateur"
                  value={Level.Amateur}
                  onChange={(value) => setLevel(value as Level)}
                />
              </div>
            </div>
            <div className="h-20 mt-8 flex flex-col justify-between">
              <span>Sports :</span>
              <Dropdown
                className="w-50"
                options={[
                  { value: Sport.MMA, label: 'MMA' },
                  { value: Sport.KickBoxing, label: 'Kick Boxing' },
                  { value: Sport.Jiujitsu, label: 'Jiu Jitsu' },
                  { value: Sport.MuayThai, label: 'Muay Thai' },
                  { value: Sport.EnglishBoxing, label: 'English Boxing' },
                ]}
                onChange={(value) => setSport(value as Sport)}
              />
            </div>
            <div className="h-20 mt-8 flex flex-col justify-between">
              <span>Experience :</span>
              <Dropdown
                className="w-50"
                options={[
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
              <span>Weight :</span>
              <Dropdown
                className="w-50"
                options={[
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
            <Button
              variant={ButtonVariant.Primary}
              className="h-10 w-40 mt-10 flex justify-center items-center">
              Apply
            </Button>
          </div>
          <div className="w-4/5 pl-3 mb-5 ml-1 mr-2 mt-2 flex flex-col border border-gray-600 rounded-3xl overflow-y-auto scrollb">
            <h3 className="w-full text-center">Events</h3>
            <div className="grid grid-cols-5">{cardEvents}</div>
          </div>
        </div>
      </div>
      {isPopUp && <PopUpEvent setIsPopUp={setIsPopUp} id={currentEvent} />}
    </>
  );
}
