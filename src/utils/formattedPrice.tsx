import { FaBangladeshiTakaSign } from "react-icons/fa6";

export const formattedPrice = (price: number) => {
  const indianFormatPrice = new Intl.NumberFormat("en-IN").format(price);
  return (
    <span className="flex items-center gap-1">
      {indianFormatPrice} <FaBangladeshiTakaSign size={10} />
    </span>
  );
};
