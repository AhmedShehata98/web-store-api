export interface IItem {
  icon: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  rating: {
    user: string;
    rate: number;
  }[];
  comment: {
    user: string;
    comment: string;
  }[];
  category: string;
  type: 'GAMES' | 'APPS';
  usedTechnologies: string[];
  repoURL: string;
  demoURL: string;
  developer: string;
}
