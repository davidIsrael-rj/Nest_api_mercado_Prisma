import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdatePutCustomerDTO } from "./dto/update-put-customer.dto";
import { UpdatePatchCustomerDTO } from "./dto/update-patch-customer.dto";
import { CustomerService } from "./customer.service";

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    async create(@Body() data: CreateCustomerDTO) {
        return this.customerService.create(data);
    }

    @Get()
    async list() {
        return this.customerService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutCustomerDTO, @Param('id', ParseIntPipe) id: number) {
        return this.customerService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchCustomerDTO, @Param('id', ParseIntPipe) id: number) {
        return this.customerService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.customerService.delete(id);
    }
}