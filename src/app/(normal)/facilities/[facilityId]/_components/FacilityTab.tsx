/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FacilityRatingProgress from "./FacilityRatingProgress";
import { FaPaperPlane, FaRegCommentDots, FaStar, FaRegStar } from "react-icons/fa6";
import { useState } from "react";
import { FacilitiesDataType } from "@/types/facility.type";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

const FacilityTab = ({ facility }: { facility: FacilitiesDataType }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSubmit = () => {
    if (!review.trim()) return alert("Please write a review before submitting!");
    const data = {
      rating,
      review,
      facilityId: facility._id,
    };
    console.log("Submitted Review:", data);
    setReview("");
    setRating(5);
  };

  return (
    <div className="my-10">
      <Tabs selectedIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
        <TabList className="flex justify-center gap-6 border-b border-gray-200">
          {["Description", "Reviews (0)"].map((tab, i) => (
            <Tab
              key={i}
              className={`px-4 py-2 cursor-pointer transition-all duration-300 border-b-2 ${
                activeIndex === i
                  ? "border-[#1B1F3B] text-[#1B1F3B] font-semibold"
                  : "border-transparent text-gray-500 hover:text-[#1B1F3B]"
              }`}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        {/* Description */}
        <TabPanel>
          <div className="mt-6 text-gray-700 leading-relaxed">
            <div
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: facility.description }}
            ></div>
          </div>
        </TabPanel>

        {/* Reviews */}
        <TabPanel>
          <div className="mt-6">
            {/* Ratings summary */}
            <div className="flex w-full  justify-center items-center gap-10 ">
              <div className="text-center border-r md:w-2/6">
                <h3 className="font-bold text-2xl text-[#1B1F3B]">4.0</h3>
                <p className="text-gray-500">35k ratings</p>
              </div>
              <div className="w-full md:w-4/6">
                <FacilityRatingProgress percent={20} ratings={5} reviews="20k" />
                <FacilityRatingProgress percent={40} ratings={4} reviews="20k" />
                <FacilityRatingProgress percent={10} ratings={3} reviews="20k" />
                <FacilityRatingProgress percent={25} ratings={2} reviews="20k" />
                <FacilityRatingProgress percent={5} ratings={1} reviews="20k" />
              </div>
            </div>

            {/* Empty state */}
            <div className="text-center my-16 text-gray-500 flex flex-col items-center gap-2">
              <FaRegCommentDots className="text-3xl text-gray-400" />
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>

            {/* Review form */}
            <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-sm">
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                className="mb-4"
              />

              {/* Star rating system */}
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-pointer text-2xl transition-transform duration-200 hover:scale-110"
                  >
                    {star <= (hover || rating) ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-gray-400" />
                    )}
                  </span>
                ))}
              </div>

              <div className="w-full flex justify-center">
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 text-white"
                >
                  <FaPaperPlane /> Submit
                </Button>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default FacilityTab;
