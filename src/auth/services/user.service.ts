import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import * as argon from 'argon2';
import { Transactional } from 'typeorm-transactional';
import { PointRepository } from 'src/payment/repositories/point.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly pointRepo: PointRepository,
  ) {}

  @Transactional()
  async createUser(dto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.userRepo.findOneByEmail(dto.email);
    if (user) {
      throw new BadRequestException(`'${dto.email}' email already exist`);
    }

    // argon, scrypt, bcrypt에 대한 내용은 아래 글을 읽어보세요.
    // https://myas92.medium.com/what-is-the-best-algorithm-bcrypt-scrypt-sha512-argon2-for-password-hashing-in-node-js-2-918b3e49e0b3
    const hashedPassword = await argon.hash(dto.password);
    const newUser = await this.userRepo.createUser(dto, hashedPassword);

    return { email: newUser.email };
  }

  async verifyUser(email: string, inputPassword: string): Promise<User> {
    const user = await this.userRepo.findOneByEmail(email);

    if (!user || !(await argon.verify(user.password, inputPassword))) {
      throw new UnauthorizedException(
        `Please, check email and password you entered`,
      );
    }

    return user;
  }
}
