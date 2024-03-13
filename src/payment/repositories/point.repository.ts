import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Point } from '../entities/point.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PointRepository extends Repository<Point> {
  constructor(
    @InjectRepository(Point)
    private readonly repo: Repository<Point>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async init(user: User) {
    const point = new Point();

    point.amount = 0;
    point.user = user;

    await this.repo.save(point);
    return;
  }
}
