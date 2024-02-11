import { IUser } from 'src/users/user.interface';

export interface IReview {
  _id: string;
  user: IUser;
  rate: number;
  comment: string;
  // applicationId: string;
  applicationShortId: string;
  createdAt: string;
  updatedAt: string;
}
