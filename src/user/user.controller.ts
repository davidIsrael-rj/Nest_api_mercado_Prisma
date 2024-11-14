import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller('users')
export class UserController {
    @Post()
    async create(@Body() body){
        return {body};
    }

    @Get()
    async list(){
        return {users:[{"id":"1","name":"David",}]}
    }

    @Get(':id')
    async show(@Param() param ){
        return {user:{}, param}
    }
}