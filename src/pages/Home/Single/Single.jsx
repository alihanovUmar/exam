import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import loadingImg from "../../../assets/images/loading.svg";

export const Single = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  return (
    <div className="container">
      {product ? (
        <div className="single-product">
          <img
            className="single-product__img"
            src={product.image}
            alt={product.title}
          />
          <h2 className="single-product__title">{product.title}</h2>
          <p className="single-product__description">{product.description}</p>
          <p className="single-product__price">{product.price}</p>
        </div>
      ) : (
        <div className="loading">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
    </div>
  );
};
