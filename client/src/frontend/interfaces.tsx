export interface Receipt {
  restaurant_name: string | null;
  date?: string;
  subtotal: string;
  total: string;
  surcharges: Surcharge[];
  taxes: string;
  image: string;
  location?: string;
}

export interface Surcharge {
  sur_id: number;
  surcharge_name: string | null;
  surcharge_value: string;
  surcharge_percent?: string;
  Bill_Date?: string;
  surcharge_amount: string;
  Image_key: string;
}

export interface SurchargesProps {
  surcharges: Surcharge[];
  selectedRestaurantName: string;
  closeModal: () => void;
  handleViewImage: (imageKey: string) => void;
}

export interface Restaurant {
  res_id: number;
  Name: string;
  location: string;
  lat?: number;
  lng?: number;
}
export interface LoaderText {
  text: string;
}
