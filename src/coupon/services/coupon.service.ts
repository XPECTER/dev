import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from '../dtos/create-coupon.dto';
import { CouponRepository } from '../repositories/coupon.repository';
import { Coupon } from '../entities/coupon.entity';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepo: CouponRepository) {}

  createCoupon(dtos: CreateCouponDto[]) {
    this.couponRepo.insertCoupons(dtos);
  }

  async getCoupon(): Promise<Coupon[]> {
    return this.couponRepo.findAllCoupon();
  }
}
