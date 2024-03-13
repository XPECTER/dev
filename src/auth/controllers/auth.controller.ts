import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { TokenPayload } from '../types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: true,
    });

    // res 객체를 따로 사용하면 return만으로는 응답이 가지 않는다.
    return res.json({ accessToken });
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } = this.authService.refreshAccessToken(
      req.user as TokenPayload,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: true,
    });

    return res.json({ accessToken });
  }

  // acesstokrn guard 확인용
  @UseGuards(AuthGuard('access'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
