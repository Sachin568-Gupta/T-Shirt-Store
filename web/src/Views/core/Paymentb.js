import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { isAutheticated } from "../user/api";

import DropIn from "braintree-web-drop-in-react";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/api";

const Paymentb = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAutheticated() && isAutheticated().user._id;

  const getToken = async () => {
    try {
      const response = await getmeToken(userId);
      const clientToken = response.clientToken;
      setInfo({ clientToken });
    } catch (err) {
      setInfo({ ...info, error: err });
    }
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken();
  }, []);

  const onPurchase = async () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = await info.instance.requestPaymentMethod();
    nonce = getNonce.nonce;
    const paymentData = {
      paymentMethodNonce: nonce,
      amount: getAmount(),
    };
    try {
      const response = await processPayment(userId, paymentData);
      setInfo({ ...info, success: response.success, loading: false });
      console.log("PAYMENT SUCCESS");
      const orderData = {
        products: products,
        transaction_id: response?.transaction.id,
        amount: response.transaction.amount,
      };
      createOrder(userId, orderData);
      cartEmpty(() => {
        console.log("Empty the cart");
      });
      setReload(!reload);
    } catch (err) {
      setInfo({ loading: false, success: false });
      console.log("PAYMENT FAILED");
    }
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is $ {getAmount()} </h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
