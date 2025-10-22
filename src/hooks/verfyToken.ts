import { jwtDecode } from "jwt-decode";
const verifyToken = (token: string) => {
  const decode = jwtDecode(token);
  return decode;
};
export default verifyToken;
