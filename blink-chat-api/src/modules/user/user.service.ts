import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';

const PASSWORD_GEN_SALT_COUNT = 12;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const foundUserByEmail = await this.findOne(createUserDto.email);

    if (foundUserByEmail) {
      throw new BadRequestException(USER_MESSAGE.USER_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      PASSWORD_GEN_SALT_COUNT,
    );
    const createUserObj = {
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.prisma.user.create({ data: createUserObj });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { email }, data: updateUserDto });
  }

  remove(email: string) {
    return this.prisma.user.delete({ where: { email } });
  }
}
