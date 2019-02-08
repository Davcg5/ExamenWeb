import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class MedicamentoCrearDto {
    @IsNotEmpty()
    @IsNumber()
    gramosAIngerir: number;

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    composicion: string;

    @IsNotEmpty()
    @IsString()
    usadoPara: string;

    @IsNotEmpty()
    fechaCaducidad: string;

    @IsNotEmpty()
    numeroPastillas: number;
}
