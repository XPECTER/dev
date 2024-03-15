import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  status: 'available' | 'soldout';
}
