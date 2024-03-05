import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  a() {
    // const asdf: string = this.configService.get<string>('DATABASE_USER');
  }
}
