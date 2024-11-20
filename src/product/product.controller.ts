import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdatePutProductDTO } from "./dto/update-put-product.dto";
import { UpdatePatchProductDTO } from "./dto/update-patch-product.dto";
import {ProductService} from "./product.service";

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    async create(@Body() {name, precoVenda, precoCusto,fornecedor,setor}:CreateProductDTO) {
       
        return this.productService.create(name, precoCusto, precoVenda, fornecedor, setor)
    }

    @Get()
    async list() {
        return this.productService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe)  id) {
        return { product: {}, id }
    }
    @Put(':id')
    async update(@Body() body: UpdatePutProductDTO,@Param('id', ParseIntPipe)  id) {
        return {
            method: 'put',
            body,
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() body:UpdatePatchProductDTO, @Param('id', ParseIntPipe)  id){
        return{
            method: 'patch',
            body,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)  id){
        return {
            id
        }
    }

}
