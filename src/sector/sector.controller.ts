import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('sector')
export class SectorController {
    @Post()
    async create(@Body() body) {
        return { body }
    }

    @Get()
    async list() {
        return { sector: [{ "id": "1", "name": "papelaria" }] }
    }

    @Get(':id')
    async show(@Param() params) {
        return { sector: {}, params }
    }

    @Put(':id')
    async update(@Body() body, @Param() params){
        return {
            method: 'put',
            body,
            params
        }
    }

    @Patch(":id")
    async updatePartial(@Body() body, @Param() params){
        return {
            method:'Patch',
            body,
            params
        }
    }

    @Delete(':id')
    async delete(@Param() params){
        return {params}
    }
}