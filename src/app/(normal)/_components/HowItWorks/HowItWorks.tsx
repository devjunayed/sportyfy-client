import { Search, Calendar, CreditCard } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Find Your Facility",
      description: "Browse through our wide range of sports facilities and select the one that suits your needs.",
      icon: Search,
    },
    {
      number: 2,
      title: "Choose Date & Time",
      description: "Select your preferred date and time slot based on the facility's availability.",
      icon: Calendar,
    },
    {
      number: 3,
      title: "Book & Pay",
      description: "Complete your booking by making a secure payment and receive instant confirmation.",
      icon: CreditCard,
    },
  ]

  return (
    <section className="w-full  ">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold ">How It Works</h2>
          <p className="mt-2 text-gray-500">Book your favorite sports facility in three simple steps</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-12 md:space-y-16">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-900 shadow-sm md:mb-0">
                <span className="text-2xl font-bold">{step.number}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold ">{step.title}</h3>
                  <step.icon className="h-5 w-5 text-gray-500" />
                </div>
                <p className="mt-2 text-gray-600">{step.description}</p>

                {step.number < steps.length && (
                  <div className="mt-6 hidden h-12 w-0.5 bg-gray-200 md:ml-8 md:block"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
