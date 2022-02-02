import React, { useState, useEffect } from "react";
import "../../index.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import Paymentb from "./Paymentb";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products &&
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              removeFromCart={true}
              addtoCart={false}
              setReload={setReload}
              reload={reload}
            />
          ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {" "}
          {products && products?.length > 0 ? (
            loadAllProducts()
          ) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-6">
          {products && products?.length > 0 && (
            <Paymentb products={products} setReload={setReload} />
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
