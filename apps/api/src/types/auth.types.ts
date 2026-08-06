export type JwtPayload = {
  id: string;
  email: string;
  role: string;
};

export type RefreshTokenPayload = {
  id: string;
};