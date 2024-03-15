import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Relation } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @Column()
  order: Relation<Order>;

  @Column()
  productId: string;

  @Column()
  quantity: number;
}
