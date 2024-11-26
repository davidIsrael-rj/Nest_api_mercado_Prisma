import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSupplierDTO } from "./dto/create-supplier.dto";
import { UpdatePutSupplierDTO } from "./dto/update-put-supplier.dto";
import { UpdatePatchSupplierDTO } from "./dto/update-patch-supplier.dto";

@Injectable()
export class SupplierService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateSupplierDTO) {
        return this.prisma.supplier.create({
            data
        });
    }

    async listar() {
        return this.prisma.supplier.findMany();
    }

    async show(id: number) {
        return this.prisma.supplier.findUnique({
            where: { id }
        });
    }

    async update(id: number, data: UpdatePutSupplierDTO) {
        await this.verificar(id);
        return this.prisma.supplier.update({
            data,
            where: { id }
        });
    }

    async updatePartial(id: number, data: UpdatePatchSupplierDTO) {
        await this.verificar(id);
        return this.prisma.supplier.update({
            data,
            where: { id }
        });
    }

    async delete(id: number) {

        await this.verificar(id);

        return await this.prisma.supplier.delete({
            where: { id }
        })


    }

    async verificar(id: number) {
        if (!(await this.show(id))) {
            throw new NotFoundException(`O Id: ${id} não existe.`)
        }
    }
}