import { Module } from '@nestjs/common';
import { CouponController } from './controllers/coupon.controller';
import { IssuedCouponController } from './controllers/issued-coupon.controller';
import { CouponService } from './services/coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { IssuedCoupon } from './entities/issued-coupon.entity';
import { CouponRepository } from './repositories/coupon.repository';
import { IssuedCouponRepository } from './repositories/issued-coupon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, IssuedCoupon])],
  controllers: [CouponController, IssuedCouponController],
  providers: [CouponService, CouponRepository, IssuedCouponRepository],
})
export class CouponModule {}
