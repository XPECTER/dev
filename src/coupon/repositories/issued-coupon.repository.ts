import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IssuedCoupon } from '../entities/issued-coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssuedCouponRepository extends Repository<IssuedCoupon> {
  constructor(
    @InjectRepository(IssuedCoupon)
    private readonly repo: Repository<IssuedCoupon>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
