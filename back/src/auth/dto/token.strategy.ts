import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: PrismaService) {
    super();
  }

  async validate(token: string) {
    const tokenObj = await this.db.token.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!tokenObj) {
      throw new UnauthorizedException('Hibás token');
    }

    const user = tokenObj.user;
    delete user.password;
    return user;
  }
}
