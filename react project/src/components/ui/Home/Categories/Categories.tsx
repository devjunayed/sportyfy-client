import React from "react"
import {
  Dumbbell,
  Bike,
} from "lucide-react"
import { BiBasketball, BiFootball, BiTennisBall } from "react-icons/bi"
import { FaSwimmingPool, FaTableTennis } from "react-icons/fa"
import { FaVolleyball } from "react-icons/fa6"

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
  ]

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose a Facility</h2>
          <p className="mt-2 text-gray-600">Select from our wide range of premium sports facilities</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <a
              href={`/facilities/${category.name.toLowerCase()}`}
              key={category.name}
              className="group flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-700 group-hover:bg-gray-100">
                {React.createElement(category.icon, { className: "h-8 w-8" })}
              </div>
              <h3 className="mb-1 font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
