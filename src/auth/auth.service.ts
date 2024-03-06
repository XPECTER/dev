import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneByEmail(dto.email);
    if (user) {
      throw new BadRequestException(`'${dto.email}' email already exist`);
    }

    // argon, scrypt, bcrypt에 대한 내용은 아래 글을 읽어보세요.
    // https://myas92.medium.com/what-is-the-best-algorithm-bcrypt-scrypt-sha512-argon2-for-password-hashing-in-node-js-2-918b3e49e0b3
    const hashedPassword = await argon.hash(dto.password);
    return this.userRepository.createUser(dto, hashedPassword);
  }
}
