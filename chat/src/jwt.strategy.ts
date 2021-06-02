import { User } from './entities/user.entity';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req.session.jwt || null;
        },
      ]),
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: { id: string; name: string }): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOne({ id });

    console.log(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
