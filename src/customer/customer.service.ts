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
}