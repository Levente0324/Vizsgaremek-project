import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly db: PrismaService) {
    super();
  }

  // A token validálása
  async validate(token: string) {
    // Megkeressük a token-t az adatbázisban
    const tokenObj = await this.db.token.findUnique({
      where: { token },
      include: { user: true },
    });

    // Ha nem találunk tokent, hibát dobunk
    if (!tokenObj) {
      throw new UnauthorizedException('Hibás token');
    }

    // Visszaadjuk a kapcsolódó felhasználót
    const user = tokenObj.user;
    delete user.password; // Ne adjuk vissza a jelszót
    return user;
  }
}
