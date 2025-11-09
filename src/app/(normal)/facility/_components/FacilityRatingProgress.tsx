import { Progress } from "@heroui/progress";
const FacilityRatingProgress = ({
  percent,
  ratings,
  reviews,
}: {
  percent: number;
  ratings: number;
  reviews: string;
}) => {
  return (
    <div className="flex w-full my-2 md:my-0 flex-col md:flex-row  items-center justify-center">
      <Progress className="w-full md:w-10/12 text-[#1B1F3B]" value={percent} />
      <p className="block w-full md:w-2/12 md:text-right">
        <span className="font-bold">{ratings}.0</span>{" "}
        <span className="text-gray-500 ">{reviews} reviews</span>
      </p>
    </div>
  );
};

export default FacilityRatingProgress;
