import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Point } from '../entities/point.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UserRepository } from 'src/auth/repositories/user.repository';

@Injectable()
export class PointRepository extends Repository<Point> {
  constructor(
    @InjectRepository(Point)
    private readonly repo: Repository<Point>,
    private readonly userRepo: UserRepository,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async addPoint(userId: string, pointAmount: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    let point = await this.repo.findOne({ where: { user: { id: userId } } });

    if (!point) {
      point = new Point();
      point.user = user;
      point.amount = 0;
    }

    point.amount += pointAmount;
    return this.repo.save(point);
  }
}
