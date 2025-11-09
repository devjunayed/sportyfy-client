"use client"
import React from "react"
import { Card, CardBody } from "@heroui/card"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Image } from "@heroui/image"

const testimonials = [
  {
    name: "John Doe",
    image: "https://xsgames.co/randomusers/avatar.php?g=male",
    text: "I had a great experience booking a football field. The process was quick and seamless!",
  },
  {
    name: "Jenny Smith",
    image: "https://xsgames.co/randomusers/avatar.php?g=female",
    text: "Easy to use and hassle-free booking system. I highly recommend this platform.",
  },
  {
    name: "Mike Johnson",
    image: "https://xsgames.co/randomusers/avatar.php?g=male",
    text: "I love how I can compare different venues and book the best one with just a few clicks!",
  },
]

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <section className="w-full  py-16">
      <div className="max-w-7xl mx-auto text-center ">
        <h2 className="text-3xl font-bold  mb-10">
          What Our Customers Say
        </h2>

        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index}>
              <Card shadow="sm" isPressable className="mx-auto min-w-full max-w-xl">
                <CardBody className="flex flex-col items-center h-full w-full text-center p-8 space-y-4">
                  <Image
                    alt={t.name}
                    src={t.image}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto"
                  />
                  <p className="italic">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-semibold text-gray-500">- {t.name}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Testimonials
