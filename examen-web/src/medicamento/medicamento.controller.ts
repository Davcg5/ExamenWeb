import { Like } from 'typeorm';
import {Controller, Post, Res, Body, Get, Query, Session,} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { UsuarioService } from 'src/usuario/usuario.service';
import {MedicamentoCrearDto} from "./dto/medicamento-crear.dto";
import {MedicamentoEntity} from "./medicamento-entity";
import {MedicamentoService} from "./medicamento.service";
import {PacienteService} from "../paciente/paciente.service";

@Controller('medicamento')
export class MedicamentoController {
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _medicamentoService: MedicamentoService,
        private readonly _pacienteService: PacienteService,
    ) {}

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
                let medicamentos: MedicamentoEntity[];
                if (busqueda) {
                    const consulta = {
                        where: [
                            {
                                nombre: Like(`%${busqueda}%`),
                            },
                        ],
                        relations: ['paciente'],
                    };
                    medicamentos = await this._medicamentoService.buscar(consulta);
                } else {
                    const consulta = {
                        relations: ['paciente'],
                    };
                    medicamentos = await this._medicamentoService.buscar(consulta);
                }


                response.render('medicamento-inicio', {
                    titulo: 'Medicamento',
                    arreglo: medicamentos,
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
    async crearGet(
        @Res() response,
        @Session() sesion,
        @Query('error') error: string,
    ) {
        if (sesion.usuario) {
            const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            if (esUsuario) {
                const usuario = await this._usuarioService.buscarPorId(
                    sesion.usuario.id,
                );
                const pacientes = usuario.pacientes;

                response.render('crear medicamento', {
                    titulo: 'Crear Medicamento',
                    equipos: pacientes,
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
        @Body() medicamento: MedicamentoEntity,
        @Res() response,
        @Session() sesion,
    ) {
        const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
        if (esUsuario) {
            const medicamentoValidado = new MedicamentoCrearDto();

            const paciente = await this._pacienteService.buscarPorId(+medicamento.paciente);
            medicamento.paciente = paciente;
            medicamento.gramosAIngerir = +medicamento.gramosAIngerir;

            medicamentoValidado.nombre = medicamento.nombre;
            medicamentoValidado.composicion = medicamento.composicion;
            medicamentoValidado.usadoPara = medicamento.usadoPara;
            medicamentoValidado.fechaCaducidad = medicamento.fechaCaducidad;
            medicamentoValidado.numeroPastillas = +medicamento.numeroPastillas;

            const errores: ValidationError[] = await validate(medicamentoValidado);

            const hayErrores = errores.length > 0;

            if (hayErrores) {
                console.error(errores);
                response.redirect('/medicamento/crear?error=Hay errores');
            } else {
                await this._medicamentoService.crear(medicamento);
                response.redirect('/medicamento/inicio');
            }
        } else {
            response.redirect('/sin-permiso');
        }
    }
}
