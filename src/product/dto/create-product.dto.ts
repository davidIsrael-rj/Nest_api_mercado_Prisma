import { Transform } from "class-transformer";
import { IsNumberString, IsString } from "class-validator";

export class CreateProductDTO {
   
    @IsString()
    name: string;

    @IsNumberString()
    precoCusto:number;

    @IsNumberString()
    precoVenda: number;

    @IsString()
    fornecedor:string;

    @IsString()
    setor:string;

}