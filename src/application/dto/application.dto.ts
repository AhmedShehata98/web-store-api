import { IsArray, IsEmpty, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @IsEmpty()
  @IsArray()
  images: Array<string>;

  @IsEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsUrl()
  demoUrl: string;

  @IsNotEmpty()
  @IsUrl()
  repoUrl: string;

  @IsNotEmpty()
  @IsArray()
  usedTechnologies: Array<string>;
}

export class UpdateApplicationDto {
  @IsEmpty()
  @IsString()
  category: string;

  @IsEmpty()
  @IsUrl()
  demoUrl: string;

  @IsEmpty()
  @IsUrl()
  repoUrl: string;

  @IsEmpty()
  @IsArray()
  usedTechnologies: Array<string>;

  @IsEmpty()
  @IsUrl()
  thumbnail: string;

  @IsEmpty()
  @IsArray()
  images: Array<string>;

  @IsEmpty()
  @IsUrl()
  icon: string;

  @IsEmpty()
  @IsString()
  title: string;

  @IsEmpty()
  @IsString()
  description: string;
}
