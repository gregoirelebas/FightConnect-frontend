"use client";
import Button, { ButtonVariant } from "@/app/...components/Button";
import Link from "next/link";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function upcomingEvent(props: any) {
  return (
    <div className="bg-gray-500 mt-3 min-h-18 w-full rounded-2xl flex flex-row justify-around items-center">
      <span>{props.name}</span>
      <span>{props.date}</span>
      <span>{props.level}</span>
      <span>{props.askFigther}</span>
      <Button variant={ButtonVariant.Primary} className="w-35 h-10 text-xs">
        Go to Fight Page
      </Button>
    </div>
  );
}
