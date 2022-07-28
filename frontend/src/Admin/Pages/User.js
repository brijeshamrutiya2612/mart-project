import * as React from "react";
import {
  Paper,
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Admin from "../Admin";
function User() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  
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
              <TableCell>
                No.
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell>
                Address
              </TableCell>
              <TableCell>
                Mobile
              </TableCell>
              <TableCell colSpan={2}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.getUser.map((item, i) => {
              return (
                <>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{verticalAlign:"top"}}
                  >
                    <TableCell align="left">{i+1}</TableCell>
                    <TableCell align="left">{item.email}</TableCell>
                    <TableCell align="left">{item.address1}<br/>{item.address2}<br/>{item.address3}</TableCell>
                    <TableCell align="left">{item.phone}</TableCell>
                    <TableCell align="left"><DeleteIcon style={{color:"red"}}/></TableCell>
                    <TableCell align="left"><EditIcon style={{color:"green"}}/></TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}

export default User;
