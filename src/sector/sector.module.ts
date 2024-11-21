import { Module } from "@nestjs/common";
import { SectorController } from "./sector.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { SectorService } from "./sector.service";

@Module({
    imports:[PrismaModule],
    controllers:[SectorController],
    providers:[SectorService],
    exports: []
})
export class SectorModule {}