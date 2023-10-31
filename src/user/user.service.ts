import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { hash } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });

  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
