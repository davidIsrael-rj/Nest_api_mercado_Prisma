import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateSectorDTO } from "./dto/create-sector.dto";
import { UpdatePutSectorDTO } from "./dto/update-put-sector.dto";
import { UpdatePatchSectorDTO } from "./dto/update-patch-sector.dto";
import { SectorService } from "./sector.service";


@Controller('sector')
export class SectorController {

    constructor(private readonly sectorService: SectorService){}
    @Post()
    async create(@Body() data:CreateSectorDTO) {
        return this.sectorService.create(data);
    }

    @Get()
    async list() {
        return this.sectorService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id:number) {
        return this.sectorService.show(id);
    }

    @Put(':id')
    async update(@Body() body:UpdatePutSectorDTO, @Param('id', ParseIntPipe) id:number){
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchSectorDTO, @Param('id', ParseIntPipe) id:number ){
        return {
            method:'Patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return {id}
    }
}