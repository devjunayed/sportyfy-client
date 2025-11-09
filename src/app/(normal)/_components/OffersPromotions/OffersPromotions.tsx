"use client"
import React from "react"
import { Card, CardBody } from "@heroui/card"
import { motion } from "framer-motion"
import { Image } from "@heroui/image"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"

const OffersPromotions = () => {
  return (
    <section
      className="relative w-full py-10 bg-gradient-to-b  from-[#f9f9f9] to-[#ececec] overflow-hidden"
    >
      {/* Optional decorative background image */}
      <Image
        removeWrapper
        alt="offers background"
        src="/assets/images/promotions.png"
        className="absolute inset-0 w-full rounded-none h-full object-cover opacity-10 z-0"
      />

      {/* Dark overlay if needed */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        <Card shadow="none" className="bg-transparent">
          <CardBody className="flex flex-col items-center space-y-6">
            <Image
              alt="gift icon"
              src="/assets/images/gift.png"
              width={160}
              height={160}
              className="mx-auto mb-2"
            />
            <h2 className="text-3xl text-white  sm:text-4xl font-bold ">
              Exclusive Offers & Promotions
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Don&apos;t miss out on our limited-time offers! Subscribe to our
              newsletter to stay updated on the latest promotions.
            </p>

            {/* Email input + button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-72 px-4 py-2 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B1F3B]"
              />
              <Button
                color="primary"
                radius="sm"
                className="bg-[#1B1F3B] text-white px-6 py-2 rounded-md hover:opacity-90 transition"
              >
                Subscribe
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  )
}

export default OffersPromotions
