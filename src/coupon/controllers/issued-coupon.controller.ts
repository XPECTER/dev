import { Controller, Post, Get, Put, Delete } from '@nestjs/common';

@Controller('api/coupon/issue')
export class IssuedCouponController {
  constructor() {}

  @Get()
  getAllIssuedCoupons() {
    return;
  }

  @Post()
  issueCoupon() {
    return;
  }

  @Put(':id')
  modifyIssuedCoupon() {
    return;
  }

  @Delete(':id')
  deleteIssuedCoupon() {
    return;
  }
}
