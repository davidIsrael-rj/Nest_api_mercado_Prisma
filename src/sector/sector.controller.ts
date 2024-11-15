import { Body, Controller, Get, Param, Post } from "@nestjs/common";

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
}