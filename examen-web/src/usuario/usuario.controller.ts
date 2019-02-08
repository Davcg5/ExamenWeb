import { UsuarioCreateDto } from './dto/usuario-create.dto';
import {Controller, Post, Param, Res, Body, Get, Session,} from '@nestjs/common';
import { UsuarioService, Usuario } from './usuario.service';
import { ValidationError, validate } from 'class-validator';
import {RolService} from "../rol/rol.service";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _rolService: RolService,
    ) {}

    @Post('register')
    async registerUser(@Body() usuario: Usuario, @Res() response) {
        const usuarioValidado = new UsuarioCreateDto();

        usuarioValidado.nombre = usuario.nombre;
        usuarioValidado.correo = usuario.correo;
        usuarioValidado.password = usuario.password;
        usuarioValidado.fechaNacimiento = usuario.fechaNacimiento;

        const errores: ValidationError[] = await validate(usuarioValidado);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);
            response.redirect('/register?error=Hay errores');
        } else {
            await this._usuarioService.crear(usuario);

            response.redirect('/login');
        }
    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Session() sesion,
    ) {
        const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
        if (esAdministrador) {
            const usuarioEncontrado = await this._usuarioService.buscarPorId(
                +idUsuario,
            );

            await this._usuarioService.borrar(Number(idUsuario));

            const parametrosConsulta = `?accion=borrar&nombre=${
                usuarioEncontrado.nombre
                }`;

            response.redirect('/admin/inicio' + parametrosConsulta);
        } else {
            response.redirect('/sin-permiso');
        }
    }

    @Post('quitarRol/:idUsuario')
    async quitarRol(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() body,
        @Session() sesion,
    ) {
        const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
        if (esAdministrador) {
            const usuario = await this._usuarioService.buscarPorId(Number(idUsuario));

            const index = usuario.roles.findIndex(rolEntity => {
                return rolEntity.id === +body.rol;
            });

            usuario.roles.splice(index, 1);

            await this._usuarioService.actualizar(+idUsuario, usuario);

            response.redirect('/admin/editarRoles/' + idUsuario);
        } else {
            response.redirect('/sin-permiso');
        }
    }

    @Post('agregarRol/:idUsuario')
    async agregarRol(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() body,
        @Session() sesion,
    ) {
        const esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
        if (esAdministrador) {
            const usuario = await this._usuarioService.buscarPorId(Number(idUsuario));
            const roles = await this._rolService.buscar();

            const rol = roles.find(rol => {
                return rol.id === +body.roles;
            });

            const index = usuario.roles.findIndex(rolEntity => {
                return rolEntity.id === +body.roles;
            });

            let parametrosConsulta = '';
            if (index >= 0) {
                parametrosConsulta = '?error=yaExiste';
            } else {
                usuario.roles.push(rol);
                await this._usuarioService.actualizar(+idUsuario, usuario);
            }

            response.redirect('/admin/editarRoles/' + idUsuario + parametrosConsulta);
        } else {
            response.redirect('/sin-permiso');
        }
    }
}
