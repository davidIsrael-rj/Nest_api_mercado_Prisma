import { IsDate, IsDateString, IsString, MinLength } from "class-validator";

export class CreateSectorDTO {

    @IsString()
    @MinLength(4, { message: 'O setor tem que ter um minímo de 4 caracteres' })
    name: string

}