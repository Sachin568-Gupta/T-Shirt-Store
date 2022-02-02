import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../user/api";
import { getProducts, deleteProduct } from "./api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = isAutheticated();

  const preload = async () => {
    try {
      const response = await getProducts();
      setProducts(response?.data || []);
    } catch (err) {
      console.error("Error while load products");
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = async (productId) => {
    try {
      await deleteProduct(productId, user._id);
      preload();
    } catch (err) {
      console.error("Error while deleting the product");
    }
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
