export interface Pathology {
  _id: string;
  name: string;
  categories?: string[];
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  rating: number;
  distance: string;
  startingPrice: string;
  discount?: string;
  images?: string[];
}

export * from "./PathologyDetails";
