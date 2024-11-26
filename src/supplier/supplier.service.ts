import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSupplierDTO } from "./dto/create-supplier.dto";

@Injectable()
export class SupplierService {

    constructor(private readonly prisma:PrismaService){}

    async create(data:CreateSupplierDTO){
        return this.prisma.supplier.create({
            data
        });
    }
}