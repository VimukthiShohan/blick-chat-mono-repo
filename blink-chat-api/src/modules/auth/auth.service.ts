import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/auth.dto';
import { USER_MESSAGE } from '../../utils/responseMessages';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOne(loginUserDto.email);

    if (!user) {
      throw new BadRequestException(USER_MESSAGE.NOT_FOUND);
    }

    if (await bcrypt.compare(loginUserDto.password, user.password)) {
      const userDetails = {
        email: loginUserDto.email,
        name: `${user.firstName} ${user.lastName}`,
      };
      const accessToken = await this.jwtService.signAsync(userDetails);
      return { ...user, accessToken };
    } else {
      throw new BadRequestException(USER_MESSAGE.INCORRECT_PASSWORD);
    }
  }
}
