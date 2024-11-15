import { Body, Controller, Post } from "@nestjs/common";

@Controller('customer')
export class CustomerController {
    
    @Post()
    async create(@Body() body){
        return {body}
    }
}