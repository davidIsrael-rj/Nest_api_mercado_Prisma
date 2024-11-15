import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller('customer')
export class CustomerController {
    
    @Post()
    async create(@Body() body){
        return {body}
    }

    @Get()
    async list(){
        return {customer:[{"id":"1","name":"David Israel"}]}
    }

    @Get('id')
    async show(@Param() param){
        return {customer:{}, param}
    }
}