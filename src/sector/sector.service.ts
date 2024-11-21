import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSectorDTO } from "./dto/create-sector.dto";
import { UpdatePutSectorDTO } from "./dto/update-put-sector.dto";

@Injectable()
export class SectorService {

    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateSectorDTO) {
        return this.prisma.sector.create({
            data,
        });
    }

    async list() {
        return this.prisma.sector.findMany()
    }

    async show(id: number) {
        return this.prisma.sector.findUnique({
            where: { id }
        });
    }

    async update(id: number, data: UpdatePutSectorDTO) {
        return this.prisma.sector.update({
            data,
            where: { id }
        });
    }

    async delete (id: number){
        return this.prisma.sector.delete({
            where:{id}
        });
    }
}