import react, { useReducer, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../store/userSlice";
import { getSellerData } from "../../store/sellerSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Admin from "../Admin";
import Loading from "../../components/Loading";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, getProd: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function User() {
  const [{ loading, error, getProd, getRating }] = useReducer(reducer, {
    getProd: [],
    getRating: [],
    loading: true,
    error: "",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  const seller = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [displayUserDetail, setDisplayUserDetail] = useState(false);
  const [displaySellerDetail, setDisplaySellerDetail] = useState(false);
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getSellerData());
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const userDelet = async (id) => {
    const res = await axios.delete(
      `https://shopping-mart-react-app.herokuapp.com/api/${id}`
    );
    const updateView = user.getUser.filter((user) => {
      return user._id !== id;
    });
    dispatch(getUserData());
  };
  
  const sellerDelete = async (id) => {
    const res = await axios.delete(
      `https://shopping-mart-react-app.herokuapp.com/api/seller/${id}`
    );
    const updateView = seller.getSeller.filter((seller) => {
      return seller._id !== id;
    });
    dispatch(getSellerData());
  };
  
  const DisplayUserDetail = () =>{
    if(displaySellerDetail === true){
      setDisplaySellerDetail(false)
      setDisplayUserDetail(true)
    } else {
      setDisplayUserDetail(true)
    }
  }
  const closeDisplayUserDetail = () =>{
    setDisplayUserDetail(false)
  }
  const DisplaySellerDetail = () =>{
    if(displayUserDetail === true){
      setDisplayUserDetail(false)
      setDisplaySellerDetail(true)
    } else {
      setDisplaySellerDetail(true)
    }
  }
  const closeDisplaySellerDetail = () =>{
    setDisplaySellerDetail(false)
  }
  return (
    <div className="container col-lg-15 my-4">
      <div className="my-4 text-center">
        <div className="container text-left">
          <Admin></Admin>
        </div>
        {displayUserDetail !== true ?
        <Button
        className="m-2 text-center"
        onClick={DisplayUserDetail}
        >
          <strong>Total User</strong> (<strong>{user.getUser.length}</strong>)
        </Button>:<Button
        className="m-2 text-center"
        variant="danger"
        onClick={closeDisplayUserDetail}
        >
          <strong>Total User</strong> (<strong>{user.getUser.length}</strong>)
        </Button>
        }
        {displaySellerDetail !== true ?
        <Button onClick={DisplaySellerDetail}>
          <strong>Total Seller</strong> (
          <strong>{seller.getSeller.length}</strong>)
        </Button>:
        <Button variant="danger" onClick={closeDisplaySellerDetail}>
        <strong>Total Seller</strong> (
        <strong>{seller.getSeller.length}</strong>)
      </Button>
    }
      </div>
      <div className="container my-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell colSpan={2}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {loading ? (
        <Loading/>
      ) : error ? (
        <div>{error}</div>
      ) : ( <> */}
              {displayUserDetail === true && (
                <>
                  {user.getUser.map((item, i) => {
                    return (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          style={{ verticalAlign: "top" }}
                        >
                          <TableCell align="left">{i + 1}</TableCell>
                          <TableCell align="left">{item.firstname}</TableCell>
                          <TableCell align="left">{item.email}</TableCell>
                          <TableCell align="left">
                            {item.isAdmin === false ? "User" : "Admin"}
                          </TableCell>
                          <TableCell align="left">
                            {item.isAdmin === false ? "User" : "Admin"}
                          </TableCell>
                          <TableCell align="left">
                            <DeleteIcon
                              onClick={() => userDelet(item._id)}
                              style={{ color: "red" }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <EditIcon
                              onClick={handleClickOpen}
                              style={{ color: "green" }}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </>
              )}
              {displaySellerDetail === true && (
                <>
                  {seller.getSeller.map((item, i) => {
                    return (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          style={{ verticalAlign: "top" }}
                        >
                          <TableCell align="left">{i + 1}</TableCell>
                          <TableCell align="left">{item.firstname}</TableCell>
                          <TableCell align="left">{item.email}</TableCell>
                          <TableCell align="left">
                            {item.isAdmin === false ? "Seller" : "Admin"}
                          </TableCell>
                          <TableCell align="left">
                            {item.isAdmin === false ? "Seller" : "Admin"}
                          </TableCell>
                          <TableCell align="left">
                            <DeleteIcon
                              onClick={() => sellerDelete(item._id)}
                              style={{ color: "red" }}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <EditIcon
                              onClick={handleClickOpen}
                              style={{ color: "green" }}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </>
              )}
              
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog className="container" open={open} onClose={handleClose}>
          <DialogTitle>Edit User Detail</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
            </DialogContentText> */}
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              SET
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default User;
