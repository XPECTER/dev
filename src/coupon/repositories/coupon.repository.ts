import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Coupon } from '../entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCouponDto } from '../dtos/create-coupon.dto';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
  constructor(
    @InjectRepository(Coupon)
    private readonly repo: Repository<Coupon>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async insertCoupons(dtos: CreateCouponDto[]) {
    const items: Coupon[] = [];

    for (const item of dtos) {
      const newCoupon = new Coupon();
      newCoupon.name = item.name;
      newCoupon.type = item.type;
      newCoupon.value = item.value;
      items.push(newCoupon);
    }

    return this.repo.insert(items);
  }

  async findAllCoupon() {
    return this.repo.find({ select: ['id', 'name', 'type', 'value'] });
  }
}
