import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IssuedCoupon } from './issued-coupon.entity';

@Entity()
export class Coupon extends BaseEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.coupon)
  issuedCoupons: Relation<IssuedCoupon[]>;
}
