import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async createToken(user:User) {
        return this.jwtService.sign({
            id:user.id,
            name: user.name,
            email: user.email
        }, {
            expiresIn: "7 days",
            subject:String(user.id),
            issuer:'login',
            audience: 'users'
        });
    }

    async checkToken(token: string) {
        // return this.jwtService.verify();
    }

    async login(email: string, password: string) {

       const user = await this.prisma.user.findFirst({
            where: {
                email,
                password
            }
        });

        if (!user){

            throw new UnauthorizedException('E-mail e/ou senha incorretos.')
        }

        return user;
    }

    async forget(email: string){
        const user = await this.prisma.user.findFirst({
            where:{
                email
            }
        });

        if(!user){
            throw new UnauthorizedException('E-mail está incorreto.');
        }
        //TO DO:enviar o e-mail...
        return true;
    }

    async reset(password: string, token: string){
        //TO DO: Validar o Token...

        const id = 0;

        await this.prisma.user.update({
            where:{
                id,
            },
            data:{
                password,
            }
        });

        return true;
    }

}