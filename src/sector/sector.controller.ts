import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateSectorDTO } from "./dto/create-sector.dto";
import { UpdatePutSectorDTO } from "./dto/update-put-sector.dto";
import { UpdatePatchSectorDTO } from "./dto/update-patch-sector.dto";

@Controller('sector')
export class SectorController {
    @Post()
    async create(@Body() body:CreateSectorDTO) {
        return { body }
    }

    @Get()
    async list() {
        return { sector: [{ "id": "1", "name": "papelaria" }] }
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id:Number) {
        return { sector: {}, id }
    }

    @Put(':id')
    async update(@Body() body:UpdatePutSectorDTO, @Param('id', ParseIntPipe) id:Number){
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body: UpdatePatchSectorDTO, @Param('id', ParseIntPipe) id:Number ){
        return {
            method:'Patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:Number){
        return {id}
    }
}