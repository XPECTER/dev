import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { getUUID } from 'src/common/util/generate-uuid';
import dayjs from 'dayjs';
import { TokenPayload } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(dto: LoginDto) {
    const user = await this.userService.verifyUser(dto.email, dto.password);
    const payload = this.createTokenPayload(user.id);
    const accessToken = this.createAccessToken(payload);
    const refreshToken = this.createRefreshToken(payload);
    console.log(
      this.calculateDate(this.configService.get<string>('JWT_ACCESS_EXPIRY')),
    );
    console.log(dayjs().unix());

    return { accessToken, refreshToken };
  }

  public refreshAccessToken(payload: TokenPayload) {
    const newPayload = this.createTokenPayload(payload.sub);
    const accessToken = this.createAccessToken(newPayload);
    const refreshToken = this.createRefreshToken(newPayload);

    return { accessToken, refreshToken };
  }

  private createTokenPayload(userId: string): TokenPayload {
    return {
      sub: userId,
      iat: dayjs().unix(),
      jti: getUUID(),
    };
  }
  private createAccessToken(payload: TokenPayload) {
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRY');

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    return token;
  }

  private createRefreshToken(payload: TokenPayload) {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRY');

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    return token;
  }

  private calculateDate(expiry: string) {
    const value = parseInt(expiry.slice(0, -1));
    const unit = expiry.slice(-1) as dayjs.ManipulateType;
    return dayjs().add(value, unit).unix();
  }
}
