import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from '../auth/dto/authDto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }
  // create
  async create(authDTO: AuthDto.SignUp) {
    if (!authDTO.password) {
      throw new Error('비밀번호가 필요합니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(authDTO.password, salt);

    const user = this.userRepository.create({
      ...authDTO,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  // id 찾기
  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
  // 비밀번호 변경
  async resetPassword(id: number, password: string) {
    const userEntity = await this.userRepository.findOne({
      where: {
        id
      },
    });

    if (!userEntity) {
      throw new Error('사용자가 존재하지 않습니다.');
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    userEntity.password = hashedPassword;

    await this.userRepository.save(userEntity);
  }
  async leave(id: number) {
    const userEntity = await this.userRepository.findOne({
      where: { id },
    });

    if (!userEntity) {
      throw new Error('사용자가 존재하지 않습니다.');
    }

    await this.userRepository.remove(userEntity);
  }
}
