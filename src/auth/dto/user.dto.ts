import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  profileImageUrl: string | null;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  country: string;

  @IsString()
  usedFramework: string;
}

export class getUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
