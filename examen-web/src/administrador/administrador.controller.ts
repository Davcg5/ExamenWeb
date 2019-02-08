import { Controller, Get, Res, Query, Session, Param } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/usuario-entity';
import { Like } from 'typeorm';
import { RolService } from 'src/rol/rol.service';

@Controller('admin')
export class AdministradorController {
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolService: RolService,
    ) {}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {
        if (sesion.usuario) {
            const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            if (esAdministrador) {
                let mensaje; // undefined
                let clase; // undefined

                if (accion && nombre) {
                    switch (accion) {
                        case 'actualizar':
                            clase = 'info';
                            mensaje = `Registro ${nombre} actualizado`;
                            break;
                        case 'borrar':
                            clase = 'danger';
                            mensaje = `Registro ${nombre} eliminado`;
                            break;
                    }
                }

                let usuarios: UsuarioEntity[];
                if (busqueda) {
                    const consulta = {
                        where: [
                            {
                                nombre: Like(`%${busqueda}%`),
                            },
                            {
                                correo: Like(`%${busqueda}%`),
                            },
                        ],
                    };
                    usuarios = await this._usuarioService.buscar(consulta);
                } else {
                    usuarios = await this._usuarioService.buscar();
                }
                response.render('admin-inicio', {
                    titulo: 'Administrador - Inicio',
                    arreglo: usuarios,
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

    @Get('editarRoles/:idUsuario')
    async editarRoles(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Query('error') error: string,
        @Session() sesion,
    ) {
        if (sesion.usuario) {
            const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            const esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            if (esAdministrador) {
                const usuarioAActualizar = await this._usuarioService.buscarPorId(
                    Number(idUsuario),
                );

                const roles = await this._rolService.buscar();

                response.render('admin-editar', {
                    usuarioActualizar: usuarioAActualizar,
                    roles: roles,
                    error: error,
                    esUsuario: esUsuario,
                    esAdministrador: esAdministrador,
                    logedin: true,
                    nombreUsuario: sesion.usuario.nombre,
                    titulo: 'Administrdor - Editar Roles',
                });
            } else {
                response.redirect('/sin-permiso');
            }
        } else {
            response.redirect('/');
        }
    }
}
