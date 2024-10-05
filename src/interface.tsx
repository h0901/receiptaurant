export interface RestaurantDetails {
  name: string;
  id: string;
}

export interface RestaurantCardProps {
  restaurants: RestaurantDetails[];
}

export interface SearchProps {
    restaurants: string[];
  }
