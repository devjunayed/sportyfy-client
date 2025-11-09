"use client";
import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Dumbbell, Bike } from "lucide-react";
import { BiBasketball, BiFootball, BiTennisBall } from "react-icons/bi";
import { FaSwimmingPool, FaTableTennis } from "react-icons/fa";
import { FaVolleyball } from "react-icons/fa6";

export default function Categories() {
  const categories = [
    {
      name: "Basketball",
      icon: BiBasketball,
      description: "Indoor & outdoor courts",
    },
    {
      name: "Tennis",
      icon: BiTennisBall,
      description: "Clay & hard courts",
    },
    {
      name: "Swimming",
      icon: FaSwimmingPool,
      description: "Olympic & training pools",
    },
    {
      name: "Football",
      icon: BiFootball,
      description: "Full-size & 5-a-side pitches",
    },
    {
      name: "Gym",
      icon: Dumbbell,
      description: "Weights & cardio equipment",
    },
    {
      name: "Cycling",
      icon: Bike,
      description: "Velodrome & spin classes",
    },
    {
      name: "Table Tennis",
      icon: FaTableTennis,
      description: "Recreational & competition tables",
    },
    {
      name: "Volleyball",
      icon: FaVolleyball,
      description: "Indoor & beach courts",
    },
  ];

  return (
    <section className="w-full  pt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold ">
            Choose a Facility
          </h2>
          <p className="mt-2 text-gray-400">
            Select from our wide range of premium sports facilities
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              isPressable
              shadow="sm"
              className="group p-4 hover:shadow-md transition-all"
            >
              <CardBody className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-700 group-hover:bg-gray-100 transition-colors">
                  {React.createElement(category.icon, { className: "h-8 w-8" })}
                </div>
                <h3 className="mb-1 font-medium  text-lg">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </CardBody>
              <CardFooter className="flex justify-center">
                <a
                  href={`/facilities/${category.name.toLowerCase()}`}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Explore
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
