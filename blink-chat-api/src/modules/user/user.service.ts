import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto/user.dto';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { USER_MESSAGE } from '../../utils/responseMessages';

const jwt = require('jsonwebtoken');

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

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findOne(loginUserDto.email);

    if (!user) {
      throw new BadRequestException(USER_MESSAGE.NOT_FOUND);
    }

    if (await bcrypt.compare(loginUserDto.password, user.password)) {
      const userDetails = { email: loginUserDto.email };
      const accessToken = jwt.sign(
        userDetails,
        process.env.ACCESS_TOKEN_SECRET,
      );
      return { ...user, accessToken };
    } else {
      throw new BadRequestException(USER_MESSAGE.INCORRECT_PASSWORD);
    }
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
