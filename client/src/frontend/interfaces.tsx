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

export interface Restaurant {
  res_id: number;
  Name: string;
  location: string;
}

export interface LoaderText {
  text: string;
}
