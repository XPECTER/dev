import { Module } from '@nestjs/common';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { IssuedCoupon } from 'src/coupon/entities/issued-coupon.entity';
import { JwtAccessStrategy } from 'src/auth/strategies/jwt-access.strategy';
import { PointRepository } from './repositories/point.repository';
import { IssuedCouponRepository } from 'src/coupon/repositories/issued-coupon.repository';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Point, IssuedCoupon]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    JwtAccessStrategy,
    PointRepository,
    IssuedCouponRepository,
  ],
})
export class PaymentModule {}
