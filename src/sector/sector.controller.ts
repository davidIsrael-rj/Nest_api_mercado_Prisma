import { Body, Controller, Post } from "@nestjs/common";

@Controller('sector')
export class SectorController {
    @Post()
    async create(@Body() body) {
        return { body }
    }
}