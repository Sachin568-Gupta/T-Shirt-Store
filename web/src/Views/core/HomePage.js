import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="Home Page">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default HomePage;
