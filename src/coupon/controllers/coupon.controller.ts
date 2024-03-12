import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { CouponService } from '../services/coupon.service';
import { CreateCouponDto } from '../dtos/create-coupon.dto';

@Controller('api/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  createCoupon(
    @Body(new ParseArrayPipe({ items: CreateCouponDto }))
    createCouponDtos: CreateCouponDto[],
  ) {
    return this.couponService.createCoupon(createCouponDtos);
  }
}
