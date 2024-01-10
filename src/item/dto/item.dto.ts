import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsArray()
  images: string[];

  @IsObject({})
  rating: {
    user: string;
    rate: number;
  }[];

  @IsObject({})
  comment: {
    user: string;
    comment: string;
  };

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsEnum({ GAMES: 'GAMES', APPS: 'APPS' })
  type: 'GAMES' | 'APPS';

  @IsNotEmpty()
  @IsArray()
  usedTechnologies: string[];

  @IsNotEmpty()
  @IsString()
  repoURL: string;

  @IsNotEmpty()
  @IsString()
  demoURL: string;

  @IsNotEmpty()
  @IsString()
  developer: string;
}
