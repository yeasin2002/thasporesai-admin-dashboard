import type { User } from "../base.type";

export type AuthSuccessResponse = {
  status: number;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  success: boolean;
};

export type ForgotPasswordResponse = {
  status: number;
  message: string;
  success: boolean;
  data: string;
};

export type ResetPasswordResponse = {
  status: number;
  message: string;
  success: boolean;
  data: string;
};
