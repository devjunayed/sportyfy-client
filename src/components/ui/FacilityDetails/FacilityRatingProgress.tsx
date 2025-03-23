import { Progress } from "antd";

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
    <div className="flex w-full  items-center justify-between">
      <Progress className="w-10/12 text-[#1B1F3B]" showInfo={false} percent={percent} />
      <p className="block w-2/12 text-right">
        <span className="font-bold">{ratings}.0</span>{" "}
        <span className="text-gray-500 ">{reviews} reviews</span>
      </p>
    </div>
  );
};

export default FacilityRatingProgress;
