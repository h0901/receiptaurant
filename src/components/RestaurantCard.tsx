import { RestaurantDetails } from "../interface";

interface RestaurantCardProps {
  restaurants: RestaurantDetails[];
}

function RestaurantCard({ restaurants }: RestaurantCardProps) {
  return (
    <div className="restaurant-card">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="restaurant-item">
          <h2>{restaurant.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default RestaurantCard;
