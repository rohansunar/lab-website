export interface PathologyParams {
  location: string;
  area: string;
  slug: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PathologyDetails {
  name: string;
  categories: string[];
  location: string;
  area: string;
  rating: number;
  startingPrice: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  phone: string;
  openingTime: string;
  closingTime: string;
  workingDays: string;
  images: GalleryImage[];
  overview: string;
  mapUrl: string;
  tests: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}
