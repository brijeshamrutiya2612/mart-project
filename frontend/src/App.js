import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";
import Seller from "./components/Seller";
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
import User from "./Admin/Pages/User";
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

function App() {
  const { state } = useContext(Store);
  const { userInfo, sellerInfo } = state;
  return (
    <React.Fragment>
      <div
        style={{
          margin: "auto",
        }}
      >
        <ToastContainer position="top-center" limit={1} />
        <header>
          <Container>
            <Header />
          </Container>
        </header>
        <main className="pt-5">
          <Routes>
            <Route index path="/" element={<Home />}></Route>
            {userInfo && <Route index path="/" element={<Home />}></Route>}{" "}
            {sellerInfo && (
              <Route index path="/SellerHome" element={<SellerHome />}></Route>
            )}{" "}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/addToCart" element={<Addtocart />}></Route>
            <Route path="/Finalpayment" element={<Finalpayment />}></Route>
            <Route path="/shipping" element={<ShippingAddress />}></Route>
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
            <Route path="/Seller/:id" element={<Seller />}></Route>
            <Route path="/Admin" element={<Admin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/NewSellerRegister"
              element={<NewSellerRegister />}
            ></Route>
            <Route
              path="/SellerAddProduct"
              element={<SellerAddProduct />}
            ></Route>
            <Route path="/SellerProducts" element={<SellerProducts />}></Route>
            <Route
              path="/SellerEditProducts/:id"
              element={<SellerEditProducts />}
            ></Route>
            <Route path="/SellerHome" element={<SellerHome />}></Route>
            <Route
              path="/SellerManageOrder"
              element={<SellerManageOrder />}
            ></Route>
            <Route path="/addproducts" element={<AddProducts />}></Route>
            <Route path="/productview" element={<ProductView />}></Route>
            <Route
              path="/productAction/:id"
              element={<ProductAction />}
            ></Route>
            <Route path="/user" element={<User />}></Route>
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
        <header>
          <Footer />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
