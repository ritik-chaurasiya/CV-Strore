import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminSignup from "./pages/AdminSignup";
import AdminVerifyOTP from "./pages/AdminVerifyOTP";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Products from "./components/admin/Products";
import DashboardHome from "./components/admin/DashboardHome";
import UserDashboardHome from "./components/user/UserDashboardHome";
import Navbar from "./components/user/Navbar";
import Hero from "./components/user/Hero";
import Categories from "./components/user/Categories";
import FeaturedProducts from "./components/user/FeaturedProducts";
import Footer from "./components/user/Footer";
import UserProducts from "./components/user/UserProducts";
import About from "./components/user/About";
import Contact from "./components/user/Contact";
import ProductDetails from "./components/user/ProductDetails";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/Checkout";
import OrderSuccess from "./components/user/OrderSuccess";
import MyOrders from "./components/user/MyOrder";
import UserProfile from "./components/user/UserProfile";
import EditProfile from "./components/user/EditProfile";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";
import Revenue from "./components/admin/Revenue";
import Wishlist from "./components/user/Wishlist";
import GoogleSuccess from "./pages/GoogleSuccess";
import UserForgotPassword from "./components/user/UserForgotPassword";
import UserVerifyResentOTP from "./components/user/UserVerifyResentOTP";
import UserResetPassword from "./components/user/UserResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/verify-otp" element={<AdminVerifyOTP />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/user/dashboard" element={<UserDashboardHome />} /> */}
        <Route path="/" element={<UserDashboardHome />} />
        <Route path="/user/navbar" element={<Navbar />} />
        <Route path="/user/hero" element={<Hero />} />
        <Route path="/user/categories" element={<Categories />} />
        <Route path="/user/featuredproducts" element={<FeaturedProducts />} />
        <Route path="/user/footer" element={<Footer />} />
        <Route path="/userproducts" element={<UserProducts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/user-forgot-password" element={<UserForgotPassword />} />
        <Route path="/user-verify-reset-otp" element={<UserVerifyResentOTP />} />
        <Route path="/user-reset-password" element={<UserResetPassword />} />



        




        {/* Nested Routes */}

        <Route
          path="/admin/dashboard" element={<AdminDashboard />}>

          <Route index element={<DashboardHome />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="revenue" element={<Revenue />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;