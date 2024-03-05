import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  validationSchema,
  validationOptions,
} from './config/validatation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true // disable env
      envFilePath: '.env',
      // isGlobal: true, // 다른 모듈에서 import 하지 않아도 사용할 수 있다.
      validationSchema,
      validationOptions,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      // synchronize: false, // production 환경에서 true로 사용하지 말것. 데이터를 잃어버림
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
