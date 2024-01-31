import { ICategory } from 'src/category/category.interface';
import { IReview } from 'src/review/review.interface';
import { IUser } from 'src/users/user.interface';

export interface IApplication {
  shortId: string;
  title: string;
  description: string;
  thumbnail: string;
  images: Array<{
    _id: string;
    src: string;
    width: number;
    height: number;
  }>;
  review: IReview;
  category: ICategory;
  developer: IUser;
  demoUrl: string;
  repoUrl: string;
  usedTechnologies: Array<string>;
  createdAt: string;
  updatedAt: string;
}
