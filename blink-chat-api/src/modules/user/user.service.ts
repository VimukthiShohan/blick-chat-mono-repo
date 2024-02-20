import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
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
