export interface Surcharge {
  surcharge_name: string | null;
  value: string;
}

// export interface Tax {
//   tax_name: string | null;
//   value: string;
// }

export interface Receipt {
  restaurant_name: string | null;
  date: string;
  subtotal: string;
  total: string;
  surcharges: Surcharge[];
  taxes: string;
}
