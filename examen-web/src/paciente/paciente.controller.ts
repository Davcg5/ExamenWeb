import { Like } from 'typeorm';
import {Controller, Post, Res, Body, Get, Query, Session,} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import {PacienteCreateDto} from "./dto/paciente-create.dto";
import {PacienteEntity} from "./paciente-entity";
import {PacienteService} from "./paciente.service";

@Controller('paciente')
export class PacienteController {
    constructor(private readonly _pacienteService: PacienteService) {}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {
        if (sesion.usuario) {
            const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            if (esUsuario) {
                let pacientes: PacienteEntity[];
                if (busqueda) {
                    const consulta = {
                        where: [
                            {
                                nombre: Like(`%${busqueda}%`),
                            },
                        ],
                    };
                    pacientes = await this._pacienteService.buscar(consulta);
                } else {
                    pacientes = await this._pacienteService.buscar();
                }

                response.render('paciente-inicio', {
                    titulo: 'Pacientes',
                    arreglo: pacientes,
                    esUsuario: esUsuario,
                    esAdministrador: esAdministrador,
                    logedin: true,
                    nombreUsuario: sesion.usuario.nombre,
                });
            } else {
                response.redirect('/sin-permiso');
            }
        } else {
            response.redirect('/');
        }
    }

    @Get('crear')
    crearGet(@Res() response, @Session() sesion, @Query('error') error: string) {
        if (sesion.usuario) {
            const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            if (esUsuario) {
                response.render('crear-paciente', {
                    titulo: 'Crear Paciente',
                    esUsuario: esUsuario,
                    esAdministrador: esAdministrador,
                    logedin: true,
                    nombreUsuario: sesion.usuario.nombre,
                    error: error,
                });
            } else {
                response.redirect('/sin-permiso');
            }
        } else {
            response.redirect('/');
        }
    }

    @Post('crear')
    async crear(
        @Body() paciente: PacienteEntity,
        @Res() response,
        @Session() sesion,
    ) {
        const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
        if (esUsuario) {
            const pacienteValidado = new PacienteCreateDto();
            const booleanValue = paciente.tieneSeguro + '';
            paciente.hijos = +paciente.hijos;
            paciente.tieneSeguro = booleanValue == 'true';

            pacienteValidado.nombres = paciente.nombres;
            pacienteValidado.apellidos = paciente.apellidos;
            pacienteValidado.hijos = paciente.hijos;
            pacienteValidado.tieneSeguro = paciente.tieneSeguro;

            const errores: ValidationError[] = await validate(pacienteValidado);

            const hayErrores = errores.length > 0;

            paciente.usuario = sesion.usuario;

            if (hayErrores) {
                console.error(errores);
                response.redirect('/paciente/crear?error=Hay errores');
            } else {
                await this._pacienteService.crear(paciente);
                response.redirect('/paciente/inicio');
            }
        } else {
            response.redirect('/sin-permiso');
        }
    }
}
