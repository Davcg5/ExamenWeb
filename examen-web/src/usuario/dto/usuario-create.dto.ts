import {IsNotEmpty, IsString, Length, IsEmail, Matches,
} from 'class-validator';

export class UsuarioCreateDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @Length(8, 16)
    @Matches(
        new RegExp(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
        ),
    )
    password: string;

    @IsNotEmpty()
    fechaNacimiento: string;
}
