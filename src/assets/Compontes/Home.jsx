import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  styled,
  TableCell,
  tableCellClasses,
  TableBody,
  Paper,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Home({ users, onEditUser, onDeleteUser }) {
  return (
    <div>
      <div className="header">
        <h2 className="sub-heading">USER DETAILS</h2>
        {/* It is to navigate to add page when this add button icon is clicked */}
        <Link to="/add">
             <Button variant="contained">Add User</Button>
        </Link>
      </div>
      {/* All user data is displayed in the table format which is see to look */}
      {/* Each user data is displayed with edit and delete button */}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ID</StyledTableCell>
              <StyledTableCell align="center">NAME</StyledTableCell>
              <StyledTableCell align="center">USERNAME</StyledTableCell>
              <StyledTableCell align="center">EMAIL</StyledTableCell>
              <StyledTableCell align="center">PHONE</StyledTableCell>
              <StyledTableCell align="center">WEBSITE</StyledTableCell>
              <StyledTableCell align="center">EDIT</StyledTableCell>
              <StyledTableCell align="center">DELETE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="left">{user.id}</StyledTableCell>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                <StyledTableCell align="center">{user.website}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link to={`edit/${user.id}`}>
                    <EditRoundedIcon
                      onClick={() => onEditUser(user)}
                    ></EditRoundedIcon>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DeleteRoundedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => onDeleteUser(user.id)}
                  ></DeleteRoundedIcon>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;






