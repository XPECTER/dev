import { Module } from '@nestjs/common';
import { CouponController } from './controllers/coupon.controller';
import { CouponService } from './services/coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { IssuedCoupon } from './entities/issued-coupon.entity';
import { CouponRepository } from './repositories/coupon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, IssuedCoupon])],
  controllers: [CouponController],
  providers: [CouponService, CouponRepository],
})
export class CouponModule {}
