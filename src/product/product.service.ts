import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import Decimal from "decimal.js";
import { UpdatePutProductDTO } from "./dto/update-put-product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService){}

    async create (name, precoCusto, precoVenda, fornecedor, setor){

        return await this.prisma.product.create({
            data:{
                name,
                precoCusto : new Decimal(precoCusto),
                precoVenda : new Decimal(precoVenda),
                fornecedor,
                setor
            },
        })
    }

    async list(){
        return this.prisma.product.findMany();
    }

    async show(id: number){
        return this.prisma.product.findUnique({
            where:{id}
        });
    }

    async update(id: number, data:UpdatePutProductDTO){
        return this.prisma.product.update({
            data,
            where:{id}
        })
    }
}