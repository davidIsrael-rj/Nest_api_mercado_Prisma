import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ email, name, password, birthAt }: CreateUserDTO) {

        return await this.prisma.user.create({
            data: {
                email,
                name,
                password,
                birthAt: new Date(birthAt)
            },

        })
    }

    async list() {
        return this.prisma.user.findMany();
    }

    async show(id: number) {

        await this.verificar(id);

        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async update(id: number, { name, email, password, birthAt }: UpdatePutUserDTO) {
        await this.verificar(id);
        return this.prisma.user.update({
            data: { name, email, password, birthAt: new Date(birthAt) },
            where: { id }
        });
    }

    async updatePartial(id: number, { name, email, password, birthAt }: UpdatePatchUserDTO) {
        await this.verificar(id);
        return this.prisma.user.update({
            data: {
                name,
                email,
                password,
                birthAt: birthAt === undefined ? undefined : new Date(birthAt)
            },
            where: { id }
        })
    }

    async delete(id: number) {
        await this.verificar(id);
        return this.prisma.user.delete({
            where: { id }
        })
    }

    async verificar(id: number) {
        if (!(await this.prisma.user.count({
            where:{id}
        }))) {
            throw new NotFoundException(`O ID: ${id} não existe`);
        }
    }
}