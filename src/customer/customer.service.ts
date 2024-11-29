import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdatePatchCustomerDTO } from "./dto/update-patch-customer.dto";

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data:CreateCustomerDTO){
        return this.prisma.customer.create({
            data,
        });
    }

    async list(){
        return this.prisma.customer.findMany();
    }

    async show(id:number){
        await this.verificar(id);
        return this.prisma.customer.findUnique({
            where:{id}
        });
    }

    async update(id:number ,data:CreateCustomerDTO){
        await this.verificar(id);
        return this.prisma.customer.update({
            data,
            where:{id}
        });
    }

    async updatePartial(id:number, data:UpdatePatchCustomerDTO){
        await this.verificar(id);
        return this.prisma.customer.update({
            data,
            where:{id}
        });
    }

    async delete(id: number){
        await this.verificar(id);
        return this.prisma.customer.delete({
            where:{id}
        })
    }

    async verificar(id:number){
        if(!(await this.prisma.customer.count({
            where:{id}
        }))){
            throw new NotFoundException(`O ID: ${id} não existe`);
        }
    }
}