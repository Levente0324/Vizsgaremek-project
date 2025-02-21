import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  // Bejelentkezés
  async login(loginData: { email: string; password: string }) {
    const user = await this.db.user.findUniqueOrThrow({
      where: { email: loginData.email },
    });

    // Ellenőrizzük a jelszót
    if (await argon2.verify(user.password, loginData.password)) {
      // Ha a jelszó helyes, generálunk egy új tokent
      const token = crypto.randomBytes(64).toString('hex');

      // Elmentjük a tokent az adatbázisba
      await this.db.token.create({
        data: {
          token,
          userId: user.id,
        },
      });

      // Visszaadjuk a tokent
      return { token, userId: user.id };
    } else {
      throw new Error('Hibás email vagy jelszó');
    }
  }

  // Kijelentkezés (token törlése)
  async logout(token: string) {
    await this.db.token.delete({
      where: { token },
    });
  }
}
