import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class PacienteCreateDto {
    @IsNotEmpty()
    nombres: string;
    @IsNotEmpty()
    apellidos: string;

    @IsNotEmpty()
    fechaNacimiento: string;

    @IsNotEmpty()
    @IsNumber()
    hijos: number;

    @IsNotEmpty()
    @IsBoolean()
    tieneSeguro: boolean;
}
