'use client';

import { useEffect, useState } from 'react';
import Input from '../...components/Input';
import type { Event } from '@/app/...types/Event';
import EventComponent from './event';
import RadioButton from '../...components/RadioButton';
import { Sport, Level, Experience, Weight } from '../...types/enum';
import PopUpEvent from './PopUpEvent';
import SportDropdown from '../...UI/SportDropdown';
import ExperienceDropdown from '../...UI/ExperienceDropdown';
import WeightDropdown from '../...UI/WeightDropdown';
import { LevelToString, SportToString } from '../...helpers/enum';
import { sortDescend } from '../...helpers/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Button, { ButtonVariant } from '../...components/Button';

export default function EventsPage() {
  const [search, setSearch] = useState<string>('');
  const [level, setLevel] = useState<Level | undefined>(undefined);
  const [sport, setSport] = useState<Sport>(Sport.Empty);
  const [experience, setExperience] = useState<Experience>(Experience.Empty);
  const [weight, setWeight] = useState<Weight>(Weight.Empty);
  const [showFilters, setShowFilters] = useState<boolean>(true);

  const [events, setEvents] = useState<Event[]>([]);

  const [isPopUp, setIsPopUp] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + 'events/')
      .then((response) => response.json())
      .then((request) => {
        if (request.result) {
          setEvents(request.data);
        } else {
          console.error('Error registering fighter:', request.error);
        }
      });
  }, []);

  function filterEvents(event: Event) {
    if (level && event.level != level) {
      return false;
    }

    if (search != '' && !event.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    if (sport != Sport.Empty && event.sport != sport) {
      return false;
    }

    if (experience != Experience.Empty && event.experience != experience) {
      return false;
    }

    if (weight != Weight.Empty && event.weight != weight) {
      return false;
    }

    return true;
  }

  function resetFilters() {
    setSearch('');
    setLevel(undefined);
    setExperience(Experience.Empty);
    setSport(Sport.Empty);
    setWeight(Weight.Empty);
  }

  const cardEvents = events
    .filter(filterEvents)
    .sort((a: Event, b: Event) => sortDescend(a.date, b.date))
    .map((data: Event, i) => {
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

  return (
    <>
      <div className="flex flex-col gap-5 my-10 mx-80">
        <div className="flex flex-col justify-start">
          <h1 className="font-bold">Search Events</h1>
          <span className="text-grey">
            Find the perfect fighting event for your skills and weight class
          </span>
        </div>
        <div className="card w-full items-center p-4">
          <Input
            label={''}
            placeholder={'  Search an event by name'}
            value={search}
            className="w-full"
            onChange={(value) => setSearch(String(value))}
          />
        </div>
        <div className="card w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFilter} className="text-xl text-accent" />
              <h3 className="font-bold">Filters</h3>
            </div>
            <Button
              variant={ButtonVariant.Ternary}
              onClick={() => {
                setShowFilters(!showFilters);
              }}>
              {showFilters ? 'Hide' : 'Show'} filters
            </Button>
          </div>
          {showFilters && (
            <form className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Level</span>
                <div className="flex justify-around gap-5 p-3 border border-white rounded-md">
                  <RadioButton
                    name="level"
                    label={'All'}
                    value={undefined}
                    isChecked={true}
                    onChange={() => setLevel(undefined)}
                  />
                  <RadioButton
                    name="level"
                    label={LevelToString(Level.Pro)}
                    value={Level.Pro}
                    onChange={(value) => setLevel(value as Level)}
                  />
                  <RadioButton
                    name="level"
                    label={LevelToString(Level.Amateur)}
                    value={Level.Amateur}
                    onChange={(value) => setLevel(value as Level)}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-sm">Sport:</span>
                <SportDropdown className="w-50" onChange={(value) => setSport(value as Sport)} />
              </div>
              <div className=" flex flex-col justify-between">
                <span className="text-sm">Experience:</span>
                <ExperienceDropdown
                  className="w-50"
                  onChange={(value) => setExperience(value as Experience)}
                />
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-sm">Weight class:</span>
                <WeightDropdown className="w-50" onChange={(value) => setWeight(value as Weight)} />
              </div>
              <Button
                type="reset"
                variant={ButtonVariant.Primary}
                className="w-30"
                onClick={resetFilters}>
                Reset
              </Button>
            </form>
          )}
        </div>
        <span className="w-fit flex justify-around items-center gap-1.5 text-grey">
          Found <span className="text-accent">{events.length}</span> events :{' '}
        </span>
        <div className="">
          <div className="grid grid-cols-3">{cardEvents}</div>
        </div>
      </div>
      {isPopUp && <PopUpEvent setIsPopUp={setIsPopUp} token={currentEvent} />}
    </>
  );
}
