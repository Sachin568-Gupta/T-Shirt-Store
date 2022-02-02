import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../user/api";
import { Link } from "react-router-dom";
import { getSingleCategory, updateCategory } from "./api";

const UpdateCategoryComponent = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = isAutheticated();
  const url = window.location.pathname.split("/");
  const categoryId = url[url.length - 1];

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  useEffect(() => {
    const getCategory = async () => {
      const res = await getSingleCategory(categoryId);
      setName(res?.name || "");
    };
    getCategory();
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    try {
      //backend request fired
      await updateCategory(categoryId, user._id, { name });
      setError("");
      setSuccess(true);
      setName("");
    } catch (err) {
      setError(true);
    }
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-black">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a category here"
      description="Update category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategoryComponent;
