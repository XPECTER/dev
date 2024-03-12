import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from '../dtos/create-coupon.dto';
import { CouponRepository } from '../repositories/coupon.repository';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepo: CouponRepository) {}

  createCoupon(dtos: CreateCouponDto[]) {
    this.couponRepo.insertCoupons(dtos);
  }
}
