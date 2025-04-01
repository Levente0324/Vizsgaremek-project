import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(token: string, createUserDto: CreateUserDto) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      const hashedPw = await argon2.hash(createUserDto.password);
      const user = await this.db.user.create({
        data: {
          ...createUserDto,
          password: hashedPw,
          isAdmin: createUserDto.isAdmin || false,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  findAll(token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.db.user.findMany();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto, token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.db.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  remove(id: number, token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.db.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getUserByToken(token: string) {
    const tokenObj = await this.db.token.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!tokenObj) return null;
    const user = tokenObj.user;
    delete user.password;
    return user;
  }
}
