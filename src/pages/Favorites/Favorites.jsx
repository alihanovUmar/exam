import React from "react";
import { useCart } from "../../context/CartContext";

export const Favorites = () => {
  const { favorites } = useCart();

  return (
    <div>
      <div className="container">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
