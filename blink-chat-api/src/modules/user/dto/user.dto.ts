import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
