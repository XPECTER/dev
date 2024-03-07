import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.verifyUser(dto.email, dto.password);
    const payload = { name: user.name, sub: user.id };
    const accessToken = this.createAccessToken(payload);
    const refreshToken = this.createRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  createAccessToken(payload) {
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRY');

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    return token;
  }

  createRefreshToken(payload) {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRY');

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    return token;
  }
}
