import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async createUser(dto: CreateUserDto, hashedPassword: string): Promise<User> {
    const { name, email, phone } = dto;

    // const user = new User(); 와 같다.
    const user = this.repo.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // userRepo.create만 하면 DB에 저장이 안된다.
    return this.repo.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repo.findOneBy({ email });
  }
}
