import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { GrFavorite } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

export const YourCart = () => {
  const {
    cart,
    removeFromCart,
    addToFavorites,
    decreaseQuantity,
    increaseQuantity,
    removeFromFavorites,
    favorites,
  } = useCart();

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
  };

  const handleIncreaseQuantity = (id) => {
    increaseQuantity(id);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const [discount, setDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);

  useEffect(() => {
    setTotalWithDiscount(calculateTotal() - discount);
  }, [discount, cart]);

  const handleAddToFavorites = (item) => {
    if (favorites && favorites.find((favorite) => favorite.id === item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
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
                  <h2>{item.price}</h2>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="cart__btns">
                    <button
                      className="cart__btn"
                      onClick={() => handleAddToFavorites(item)}
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
          <div className="total">
            <div className="adres">
              <p>Summary</p>

              <button className="order">Enter Discount Coupon Here</button>

              <hr />

              <p className="total__info">
                Sub-total<span>€{calculateTotal().toFixed(2)}</span>
              </p>
              <p className="total__info">
                Shipping<span>€3.98</span>
              </p>
              <p className="total__info">
                TAX<span>€27.97</span>
              </p>

              <hr />

              <h3>
                Total <span>€{totalWithDiscount.toFixed(2)}</span>{" "}
              </h3>
              <p className="total__info">
                Sub-total<span>€{calculateTotal().toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
