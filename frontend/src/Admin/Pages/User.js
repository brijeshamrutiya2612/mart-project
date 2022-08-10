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
  const [{ loading, error, getProd, getRating }] = useReducer(
    reducer,
    {
      getProd: [],
      getRating: [],
      loading: true,
      error: "",
    }
  );

  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getUserData())
  }, []);
   
  console.log(user)
  const handleClickOpen = (id) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const userDelet = async (id) => {
    const res = await axios.delete(`https://shopping-mart-react-app.herokuapp.com/api/${id}`);
    const updateView = user.getUser.filter((user) => {
      return user._id !== id;
    });
    dispatch(getUserData())
  };

  return (
    <div className="col-lg-15 my-4">
      <Admin></Admin>
      <div className="container">
        <Typography variant="h5" className="my-3">
          Mart's User's Detail
        </Typography>
      </div>
      <div className="container my-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Total User</strong>
                </TableCell>
                <TableCell>
                  <strong>{user.getUser.length}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="container my-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell colSpan={2}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {loading ? (
        <Loading/>
      ) : error ? (
        <div>{error}</div>
      ) : ( <> */}
              {user.getUser.map((item, i) => {
                return (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ verticalAlign: "top" }}
                    >
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell align="left">{item.email}</TableCell>
                      <TableCell align="left">
                        {item.address1}
                        <br />
                        {item.address2}
                        <br />
                        {item.address3}
                      </TableCell>
                      <TableCell align="left">{item.phone}</TableCell>
                      <TableCell align="left">
                        <DeleteIcon onClick={() => userDelet(item._id)} style={{ color: "red" }} />
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
              {/* </>
              )} */}
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
          <Button variant="danger" onClick={handleClose}>Close</Button>
          <Button variant="success" onClick={handleClose}>SET</Button>
        </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default User;
