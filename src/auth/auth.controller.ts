import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

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
    });

    // res 객체를 따로 사용하면 return만으로는 응답이 가지 않는다.
    return res.json({ accessToken });
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('refresh')
  refresh() {
    return `Success`;
  }

  // acesstokrn guard 확인용
  @UseGuards(AuthGuard('access'))
  @Get('profile')
  getProfile() {
    return `Success`;
  }
}
