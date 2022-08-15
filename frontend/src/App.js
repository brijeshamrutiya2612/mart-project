import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import Seller from "./components/ProductDetail.js";
import Search from "./components/Search";
import Addtocart from "./components/Addtocart";
import Login from "./components/Login";
import Register from "./components/Register";
import Finalpayment from "./components/Finalpayment";
import Header from "./components/Header";
import Userprofile from "./Admin/UserPage/Userprofile";
import Footer from "./components/Footer";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Pages/Dashboard";
import AddProducts from "./Admin/Pages/AddProducts";
import Accounts from "./Admin/Pages/Accounts";
import UserDashboard from "./Admin/UserPage/UserDashboard";
import UserPurchase from "./Admin/UserPage/UserPurchase";
import { Container } from "react-bootstrap";
import { Store } from "./store/Context";
import ShippingAddress from "./components/ShippingAddress";
import { ToastContainer } from "react-toastify";
import Payment from "./components/Payment";
import OrderScreen from "./components/OrderScreen";
import ProtectedRouter from "./components/ProtectedRouter";
import ProductAction from "./Admin/Pages/ProductAction";
import ProductView from "./Admin/Pages/ProductView";
import NewSellerRegister from "./Seller/NewSellerRegister";
import SellerAddProduct from "./Seller/SellerAddProduct";
import SellerHome from "./Seller/SellerHome";
import SellerProducts from "./Seller/SellerProducts";
import SellerEditProducts from "./Seller/SellerEditProducts";
import SellerManageOrder from "./Seller/SellerManageOrder";
import SellerProfile from "./Seller/SellerProfile";
import SellerProtectedRouter from "./Seller/SellerProtectedRouter.js"
import ForgotPassword from "./components/ForgotPassword";
import Orders from "./Admin/Pages/Orders";

function App() {
  const { state } = useContext(Store);
  const { userInfo, sellerInfo } = state;
  return (
    <React.Fragment>
      <div
        style={{
          margin: "auto",
          minxWidth:"100%",
          maxWidth:"100%",
        }}
      >
        <ToastContainer position="top-center" limit={1} />
        <header>
          <Container>
            <Header />
          </Container>
        </header>
        <main className="pt-5 pb-5" style={{
          margin: "auto",
          width:"100%",
          height:"100%",
          minxWidth:"100%",
          maxWidth:"100%",
          position:"relative"
        }}>
          <Routes>
            {/* User part */}
            <Route index path="/" element={<Home />}></Route>
            {userInfo && <Route index path="/" element={<Home />}></Route>}{" "}
            {sellerInfo && (
              <Route index path="/SellerHome" element={<SellerHome />}></Route>
            )}{" "}
            {/* Public part */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/addToCart" element={<Addtocart />}></Route>
            {/* ProtectedRouter for user(Public) and purchase products */}
            <Route
              path="/Finalpayment"
              element={
                <ProtectedRouter>
                  <Finalpayment />
                </ProtectedRouter>
              }
            ></Route>
            <Route
              path="/shipping"
              element={
                <ProtectedRouter>
                  <ShippingAddress />
                </ProtectedRouter>
              }
            ></Route>
            <Route
              path="/Payment"
              element={
                <ProtectedRouter>
                  <Payment />
                </ProtectedRouter>
              }
            ></Route>
            <Route
              path="/order/:id"
              element={
                <ProtectedRouter>
                  <OrderScreen />
                </ProtectedRouter>
              }
            ></Route>
            
            
            {/* Admin Part and Its Protected Router */}
            
            <Route path="/Admin" element={<Admin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/addproducts" element={<AddProducts />}></Route>
            <Route path="/productview" element={<ProductView />}></Route>
            <Route path="/Orders" element={<Orders />}></Route>
            <Route
              path="/productAction/:id"
              element={<ProductAction />}
            ></Route>
            
            
            {/* Seller Part and Its Protected Router */}
            
            <Route path="/Seller/:id" element={<Seller />}></Route>
            <Route
              path="/NewSellerRegister"
              element={<NewSellerRegister />}
            ></Route>
            <Route
              path="/SellerAddProduct"
              element={
                <SellerProtectedRouter>
                  <SellerAddProduct />
                </SellerProtectedRouter>
              }
            ></Route>
            <Route
              path="/SellerProducts"
              element={
                <SellerProtectedRouter>
                  <SellerProducts />
                </SellerProtectedRouter>
              }
            ></Route>
            <Route
              path="/SellerEditProducts/:id"
              element={
                <SellerProtectedRouter>
                  <SellerEditProducts />
                </SellerProtectedRouter>
              }
            ></Route>
            <Route
              path="/SellerHome"
              element={
                <SellerProtectedRouter>
                  <SellerHome />
                </SellerProtectedRouter>
              }
            ></Route>
            <Route
              path="/SellerManageOrder"
              element={
                <SellerProtectedRouter>
                  <SellerManageOrder />
                </SellerProtectedRouter>
              }
            ></Route>
            <Route
              path="/SellerProfile"
              element={
                <SellerProtectedRouter>
                  <SellerProfile />
                </SellerProtectedRouter>
              }
            ></Route>
            {/* ProtectedRouter for user Dashboard */}
            <Route path="/Accounts" element={<Accounts />}></Route>
            <Route
              path="/ud/:id"
              element={
                <ProtectedRouter>
                  <UserDashboard />
                </ProtectedRouter>
              }
            ></Route>
            <Route
              path="/user/:id"
              element={
                <ProtectedRouter>
                  <Userprofile />
                </ProtectedRouter>
              }
            ></Route>
            <Route
              path="/u_purchase/:id"
              element={
                <ProtectedRouter>
                  <UserPurchase />
                </ProtectedRouter>
              }
            ></Route>
          </Routes>
        </main>
        <footer style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          right: 0,
          height:"8%",
        }}>
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default App;
