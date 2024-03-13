import { User } from 'src/auth/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

@Entity()
export class Point extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: Relation<User>;

  @Column()
  amount: number;
}
