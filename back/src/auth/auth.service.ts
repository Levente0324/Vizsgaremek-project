import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async validateToken(token: string) {
    try {
      const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenValue },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      const { user } = tokenRecord;
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Registration
  async register(userData: { email: string; password: string }) {
    const hashedPassword = await argon2.hash(userData.password);

    try {
      const user = await this.db.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
        },
      });

      return { user };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Login
  async login(loginData: { email: string; password: string }) {
    try {
      const user = await this.db.user.findUnique({
        where: { email: loginData.email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await argon2.verify(
        user.password,
        loginData.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = crypto.randomBytes(64).toString('hex');

      await this.db.token.create({
        data: {
          token,
          userId: user.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      delete user.password;
      return { token, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Logout
  async logout(token: string) {
    try {
      const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

      await this.db.token.delete({
        where: { token: tokenValue },
      });
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }
}
