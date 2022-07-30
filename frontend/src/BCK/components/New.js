import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../store/ProductsSlice";

const New = () => {
const dispatch = useDispatch();
// const users = useSelector((state) => state.user);
// console.log(users)

  useEffect(() => {
    dispatch(getData())
  },[]);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default New;
