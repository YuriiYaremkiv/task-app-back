import { Request } from 'express';

export interface IUser {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export interface CustomRequest extends Request {
  user: IUser;
}
