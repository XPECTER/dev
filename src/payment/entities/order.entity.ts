import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/auth/entities/user.entity';
import { IssuedCoupon } from 'src/coupon/entities/issued-coupon.entity';

@Entity()
export class Order extends BaseEntity {
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @Column()
  orderNo: string;

  @Column()
  amount: number;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: Relation<OrderItem[]>;

  @Column()
  pointAmountUsed: number;

  @OneToOne(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.usedOrder, {
    nullable: true,
  })
  usedIssuedCoupon: Relation<IssuedCoupon>;
}
