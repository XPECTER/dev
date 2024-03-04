import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
