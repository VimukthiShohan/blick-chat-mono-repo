export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
