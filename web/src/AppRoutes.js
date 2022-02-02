import { Navigate, Route, Routes } from "react-router-dom";
import AddCategory from "./Views/admin/AddCategory";
import AddProduct from "./Views/admin/AddProduct";
import ManageCategories from "./Views/admin/ManageCategories";
import ManageProducts from "./Views/admin/ManageProducts";
import UpdateCategoryComponent from "./Views/admin/UpdateCategory";
import UpdateProduct from "./Views/admin/UpdateProduct";
import Cart from "./Views/core/Cart";
import HomePage from "./Views/core/HomePage";
import AdminDashBoard from "./Views/user/AdminDashBoard";
import { isAutheticated } from "./Views/user/api";
import Signin from "./Views/user/Signin";
import Signup from "./Views/user/Signup";
import UserDashBoard from "./Views/user/UserDashBoard";

function PrivateRoute({ children }) {
  return isAutheticated() ? children : <Navigate to="/signin" replace />;
}
function AdminRoute({ children }) {
  return isAutheticated() && isAutheticated().user.role === 1 ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
}
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/signin" exact element={<Signin />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route
        path="/user/dashboard"
        element={
          <PrivateRoute>
            <UserDashBoard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashBoard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/create/category"
        element={
          <AdminRoute>
            <AddCategory />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <ManageCategories />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/create/product"
        element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/product/update/:productId"
        element={
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/category/update/:categoryId"
        element={
          <AdminRoute>
            <UpdateCategoryComponent />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
