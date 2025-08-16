export interface IUsersResponse {
  users: IUsersData[];
  limit: number;
  skip: number;
  total: number;
}

export interface IUsersData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  username: string;
  university: string;
  birthDate: string;
  bloodGroup: string;
}
