import { Body, Controller, Post } from "@nestjs/common";

@Controller('product')
export class ProductController {

    @Post()
    async create(@Body() body){
        return {body}
    }
}