import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ email, name, password }: CreateUserDTO) {

        return await this.prisma.user.create({
            data: {
                email,
                name,
                password,
            },

        })
    }

    async list(){
        return this.prisma.user.findMany();
    }

    
}