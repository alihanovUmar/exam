// pages/Home/Card/Card.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../../store/useStore";
import { FaArrowRight } from "react-icons/fa";
import { BiSolidCartDownload } from "react-icons/bi";
import { GrFavorite } from "react-icons/gr";
import { Search } from "../Search/Search";
import loadingImg from "../../../assets/images/loading.svg";
import No from "../../../assets/images/No results.jpg";
import { useCart } from "../../../context/CartContext";

export const Card = () => {
  const { datas, setDatas } = useStore((state) => ({
    datas: state.datas,
    setDatas: state.setDatas,
  }));
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState([]);
  const { addToCart: addToCartContext, removeFromCart, clearCart } = useCart(); // useCart hookni ishlatamiz
  const [cart, setCart] = useState([]); // Define cart state variable

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setDatas(json);
        setFilter(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error :", error);
        setLoading(false);
      });
  }, [setDatas]);

  useEffect(() => {
    let filteredData = datas;
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === selectedCategory
      );
    }
    if (search.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilter(filteredData);
  }, [selectedCategory, search, datas]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const addToFavorites = (id) => {
    const favItem = datas.find((item) => item.id === id);
    if (favItem && !favorites.some((item) => item.id === favItem.id)) {
      setFavorites([...favorites, favItem]);
    }
  };

  const addToCart = (id) => {
    const cartItem = datas.find((item) => item.id === id);
    if (cartItem && !cart.some((item) => item.id === cartItem.id)) {
      setCart([...cart, cartItem]);
      addToCartContext(cartItem);
      alert(`${cartItem.title} has been added to the cart.`);
    } else {
      alert(`${cartItem.title} is already in the cart.`);
    }
  };

  return (
    <section>
      <Search setInputVal={handleSearch} />
      <div className="container">
        <div className="card__info">
          <div className="crad__info__text">
            <div className="card__info__title">New Arrivals</div>
            <div className="card__info__suptitle">
              Check out the latest products
            </div>
          </div>

          <div className="select">
            <select
              className="option"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">All</option>
              <option value="electronics">electronics</option>
              <option value="jewelery">jewelery</option>
              <option value="men's clothing">men's clothing</option>
              <option value="women's clothing">women's clothing</option>
            </select>

            <Link to="/all">
              <button className="card__info__btn">
                View all <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <center>
            <img src={loadingImg} alt="Loading" />
          </center>
        ) : (
          <>
            <ul className="card__block">
              {filter.length ? (
                filter.map((item) => (
                  <li className="card" key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <img
                        className="card__img"
                        src={item.image}
                        alt={item.title}
                      />
                    </Link>
                    <h3 className="card__title">{item.title}</h3>
                    <p className="card__description">{item.description}</p>
                    <p className="card__price">{item.price}</p>
                    <div className="card__btns">
                      <button
                        className="card__btn1"
                        onClick={() => addToFavorites(item.id)}
                      >
                        <GrFavorite />
                      </button>
                      <button
                        className="card__btn2"
                        onClick={() => addToCart(item.id)}
                      >
                        <BiSolidCartDownload />
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <img src={No} alt="" />
              )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

