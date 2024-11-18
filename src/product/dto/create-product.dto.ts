import { Transform } from "class-transformer";
import { IsDecimal, IsNumberString, IsString } from "class-validator";

export class CreateProductDTO {
   
    @IsString()
    name: string;

    @IsDecimal({decimal_digits: '2', force_decimal:true})
    precoCusto:string;

    @IsDecimal({decimal_digits: '2', force_decimal:true})
    precoVenda: string;

    @IsString()
    fornecedor:string;

    @IsString()
    setor:string;

}