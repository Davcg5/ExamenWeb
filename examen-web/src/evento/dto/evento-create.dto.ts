import { IsNotEmpty } from 'class-validator';

export class EventoCreateDto {
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    fecha: string;

    @IsNotEmpty()
    latitud: string;

    @IsNotEmpty()
    longitud: string;
}
