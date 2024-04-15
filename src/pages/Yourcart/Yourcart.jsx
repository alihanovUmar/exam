import React from "react";
import { useCart } from "../../context/CartContext";
import { GrFavorite } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

export const YourCart = () => {
  const { cart, removeFromCart, addToFavorites } = useCart();

  const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    saveCartToLocalStorage();
  };

  return (
    <div>
      <div className="container">
        <div className="cart__left__right">
          <ul className="cart__left">
            {cart.map((item) => (
              <li className="cart__wrapper" key={item.id}>
                <div className="cart__img">
                  <img src={item.image} alt="" />
                </div>
                <div className="cart__info">
                  <div className="count">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                  <h2>{item.price}</h2>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="cart__btns">
                    <button
                      className="cart__btn"
                      onClick={() => addToFavorites(item)}
                    >
                      <GrFavorite />
                    </button>
                    <button
                      className="cart__btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total"></div>
        </div>
      </div>
    </div>
  );
};
