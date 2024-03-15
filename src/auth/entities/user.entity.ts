import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IssuedCoupon } from 'src/coupon/entities/issued-coupon.entity';
import { Order } from 'src/payment/entities/order.entity';

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

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order[]>;

  @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.user)
  issuedCoupons: Relation<IssuedCoupon[]>;
}
