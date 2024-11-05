export interface Receipt {
  restaurant_name: string | null;
  date: string;
  subtotal: string;
  total: string;
  surcharges: Surcharge[];
  taxes: string;
  image: string;
  location?: string;
}

export interface Surcharge {
  surcharge_name: string | null;
  surcharge_value: string;
  surcharge_percentage?: string;
}