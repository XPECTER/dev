import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Coupon } from './coupon.entity';
import { User } from 'src/auth/entities/user.entity';
import { Order } from 'src/payment/entities/order.entity';

// typescript를 사용할 땐 순환참조를 해결해야 한다.

@Entity()
export class IssuedCoupon extends BaseEntity {
  @ManyToOne(() => User, (user) => user.issuedCoupons)
  @JoinColumn()
  user: Relation<User>;

  @ManyToOne(() => Coupon, (coupon) => coupon.issuedCoupons)
  @JoinColumn()
  coupon: Relation<Coupon>;

  @OneToOne(() => Order, (order) => order.usedIssuedCoupon, { nullable: true })
  usedOrder: Relation<Order>;

  @Column({ type: 'timestamp', nullable: false })
  validFrom: Date;

  @Column({ type: 'timestamp', nullable: false })
  validUntil: Date;

  @Column({ type: 'boolean', nullable: false })
  isValid: boolean;

  @Column({ type: 'boolean', nullable: false })
  isUsed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  usedAt: Date;
}
