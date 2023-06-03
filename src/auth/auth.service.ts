import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private primsa: PrismaService , private config: ConfigService , private jwt : JwtService){}
    
   async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password)

        const user = await this.primsa.user.create({
            data : {
                email : dto.email,
                hash
            }
        });

        return this.generateToken(user.id , user.email);
  }

  async signin(dto: AuthDto){
      //find user
        const user = await this.primsa.user.findUnique({
            where : {
                email : dto.email
            }
        });
       
        if(!user) {
            throw new ForbiddenException('invalid credentials')
        }

        let pwMatch = await argon.verify(user.hash , dto.password)
        if(!pwMatch){
            throw new ForbiddenException('invalid credentials')
        }
        delete user.hash;

        return this.generateToken(user.id , user.email)
      
  }

  async generateToken(userId : number , email : string) {

    const payload = {
        sub: userId,
        email
    };

    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
        expiresIn : "20m",
        secret
    });

    return {
        token
    }
  }
}
