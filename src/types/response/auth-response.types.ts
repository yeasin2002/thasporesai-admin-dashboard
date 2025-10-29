import type { User } from "../base.type";

export type AuthSuccessResponse = {
  status: 200;
  message: "Login successful";
  success: true;
  refreshToken: string;
  accessToken: string;
  data: { user: User };
};
