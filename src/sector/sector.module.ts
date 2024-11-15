import { Module } from "@nestjs/common";
import { SectorController } from "./sector.controller";

@Module({
    imports:[],
    controllers:[SectorController],
    providers:[],
    exports: []
})
export class SectorModule {}