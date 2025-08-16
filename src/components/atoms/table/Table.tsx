import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../stores/thunks/fetchUsersThunk";
import { toggleLoader } from "../../../stores/slices/loaderSlice";
import type { RootState, AppDispatch } from "../../../stores/store";

export default function BasicTable() {
  const dispatch = useDispatch<AppDispatch>();

  const { data: usersState, isLoading: isUsersStateLoading } = useSelector(
    (state: RootState) => state.userStore
  );

  useEffect(() => {
    dispatch(
      toggleLoader({
        isLoading: isUsersStateLoading,
        loaderMessage: "Loading Users",
      })
    );
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const getUserName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const getGender = (gender: string) => {
    return gender === "male" ? "M" : "F";
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>University</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersState.users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getUserName(row.firstName, row.lastName)}
              </TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.university}</TableCell>
              <TableCell>{row.birthDate}</TableCell>
              <TableCell>{getGender(row.gender)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
