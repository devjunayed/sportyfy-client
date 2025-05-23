export type TFacility = {
  _id?: string;
  name: string;
  images: string[];
  description: string;
  shortDescription: string;
  category: string;
  rating?: number;
  capacity: number;
  openHours: string;
  highlight: string;
  pricePerHour: number;
  location: string;
  isDeleted?: boolean;
};
