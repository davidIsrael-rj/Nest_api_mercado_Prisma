import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSectorDTO } from "./dto/create-sector.dto";

@Injectable()
export class SectorService {

    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateSectorDTO){
        return this.prisma.sector.create({
            data,
        });
    }

    async list(){
        return this.prisma.sector.findMany()
    }
}