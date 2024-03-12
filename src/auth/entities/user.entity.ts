import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IssuedCoupon } from 'src/payment/entities/issued-coupon.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.user)
  issuedCoupons: Relation<IssuedCoupon[]>;
}
