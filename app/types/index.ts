export interface Pathology {
  name: string;
  categories?: string[];
  location: string;
  area: string;
  rating: number;
  distance: string;
  priceForTwo: string;
  discount?: string;
  imageUrl?: string;
}
