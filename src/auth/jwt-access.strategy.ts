import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private readonly configService: ConfigService) {
    super({
      // req에서 JWT를 추출하는 방법. Authorization 헤더의 Bearer 토큰 기준
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 명확히 JWT가 만료되지 않았는지 확인하는 책임을 Passport 모듈에 위임하는 기본 설정
      ignoreExpiration: false,
      //
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  // Passport는 사용자를 Request.user에 저장한다
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
