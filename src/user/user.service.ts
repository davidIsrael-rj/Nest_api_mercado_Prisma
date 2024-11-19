import { Injectable } from "@nestjs/common";
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
                birthAt:new Date(birthAt)
            },

        })
    }

    async list(){
        return this.prisma.user.findMany();
    }

    async show(id:number){
        return this.prisma.user.findUnique({
            where:{id}
        });
    }

    async update(id: number,{name,email,password,birthAt} :UpdatePutUserDTO){
        return this.prisma.user.update({
          data:{name,email,password,birthAt :new Date(birthAt)},
          where:{id}  
        });
    }
    
    async updatePartial(id: number, {name,email,password,birthAt}: UpdatePatchUserDTO){
        return this.prisma.user.update({
            data:{name,email,password,birthAt :new Date(birthAt)},
            where:{id}
        })
    }

    async delete(id: number){
        return this.prisma.user.delete({
            where:{id}
        })
    }

}