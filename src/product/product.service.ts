import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import Decimal from "decimal.js";
import { UpdatePutProductDTO } from "./dto/update-put-product.dto";
import { UpdatePatchProductDTO } from "./dto/update-patch-product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async create(name, precoCusto, precoVenda, fornecedor, setor) {

        return await this.prisma.product.create({
            data: {
                name,
                precoCusto: new Decimal(precoCusto),
                precoVenda: new Decimal(precoVenda),
                fornecedor,
                setor
            },
        })
    }

    async list() {
        return this.prisma.product.findMany();
    }

    async show(id: number) {
        await this.verificar(id);
        return this.prisma.product.findUnique({
            where: { id }
        });
    }

    async update(id: number, data: UpdatePutProductDTO) {
        await this.verificar(id);
        return this.prisma.product.update({
            data,
            where: { id }
        });
    }

    async updatePartial(id: number, data: UpdatePatchProductDTO) {
        await this.verificar(id);
        return this.prisma.product.update({
            data,
            where: { id }
        });
    }

    async delete(id: number) {
        await this.verificar(id);
        return this.prisma.product.delete({
            where: { id }
        });
    }

    async verificar(id:number){
        if(!(await this.prisma.product.count({
            where:{id}
        }))){
            throw new NotFoundException(`O ID: ${id} não existe.`)
        }
    }
}