import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClientRequest } from "../../utilities/helpers/apiClientHelper";

const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await apiClientRequest("/users");
  return response;
});

export { fetchUsers };
