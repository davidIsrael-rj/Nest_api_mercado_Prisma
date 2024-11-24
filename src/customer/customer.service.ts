import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCustomerDTO } from "./dto/create-customer.dto";

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
        return this.prisma.customer.findUnique({
            where:{id}
        });
    }

    async update(id:number ,data:CreateCustomerDTO){
        return this.prisma.customer.update({
            data,
            where:{id}
        });
    }
}