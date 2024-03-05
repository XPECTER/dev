import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  validationSchema,
  validationOptions,
} from './config/validatation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
// import { DataSource } from 'typeorm';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      // ignoreEnvFile: true // disable env
      envFilePath: '.env',
      // isGlobal: true, // 다른 모듈에서 import 하지 않아도 사용할 수 있다.
      validationSchema,
      validationOptions,
    }),
    // https://docs.nestjs.com/techniques/database#async-configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // type은 .env로 받을 수가 없네
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
      // custom datasource에 대해 더 알아볼 것.
      // dataSourceFactory: async (option) => {
      //   const dataSource = await new DataSource(option).initialize();
      //   return dataSource;
      // },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
