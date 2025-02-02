import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import { UserService } from "../user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {

    private issuer = 'login';
    private audience = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) { }

    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "7 days",
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience,
            })
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer,
            });
            return data;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(email: string, password: string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {

            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto.');
        }
        //TO DO:enviar o e-mail...

        const token = this.jwtService.sign({
            id: user.id
        }, {
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: 'forget',
            audience: 'user',
        });

        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'joaoDavid@hred.com.br',
            template: 'forget',
            context: {
                name: user.name,
                token: token
            }
        })
        return true;
    }

    async reset(password: string, token: string) {
        //TO DO: Validar o Token...
        try {
            const data: any = this.jwtService.verify(token, {
                issuer: 'forget',
                audience: 'user',
            });

            if (isNaN(Number(data.id))) {
                throw new BadRequestException("Token é inválido.");
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            const user = await this.prisma.user.update({
                where: {
                    id: Number(data.id),
                },
                data: {
                    password,
                }
            });
            return this.createToken(user);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }


    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }

}