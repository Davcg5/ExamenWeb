import {Controller, Get, Res, Post, Body, Session, Query,} from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioService } from './usuario/usuario.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly _usuarioService: UsuarioService,
    ) {}

    @Get()
    getHello(@Res() response, @Session() sesion) {
        let logedin = false;
        let esAdministrador = false;
        let esUsuario = false;
        let nombreUsuario = '';
        if (sesion.usuario) {
            esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            logedin = true;
            nombreUsuario = sesion.usuario.nombre;
        }
        response.render('inicio', {
            titulo: 'Inicio',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador,
            logedin: logedin,
            nombreUsuario: nombreUsuario,
        });
    }

    @Get('login')
    login(@Res() response, @Session() sesion, @Query('error') error: string) {
        let logedin = false;
        let esAdministrador = false;
        let esUsuario = false;
        let nombreUsuario = '';
        if (sesion.usuario) {
            esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            logedin = true;
            nombreUsuario = sesion.usuario.nombre;
        }
        response.render('login', {
            titulo: 'Registro',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador,
            logedin: logedin,
            error: error,
            nombreUsuario: nombreUsuario,
        });
    }

    @Post('login')
    async loginUser(
        @Body('correo') correo: string,
        @Body('password') password: string,
        @Res() response,
        @Session() sesion,
    ) {
        const identificado = await this._usuarioService.login(correo, password);

        if (identificado) {
            sesion.usuario = identificado;

            response.redirect('/');
        } else {
            response.redirect('/login?error=Hay errores');
        }
    }

    @Get('logout')
    logout(@Res() response, @Session() sesion) {
        sesion.usuario = undefined;
        sesion.destroy();
        response.redirect('/');
    }

    @Get('register')
    register(@Res() response, @Session() sesion, @Query('error') error: string) {
        let logedin = false;
        let esAdministrador = false;
        let esUsuario = false;
        let nombreUsuario = '';
        if (sesion.usuario) {
            esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            logedin = true;
            nombreUsuario = sesion.usuario.nombre;
        }
        response.render('register', {
            titulo: 'Registro',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador,
            logedin: logedin,
            nombreUsuario: nombreUsuario,
            error: error,
        });
    }

    @Get('sin-permiso')
    sinPermiso(@Res() response, @Session() sesion) {
        let logedin = false;
        let esAdministrador = false;
        let esUsuario = false;
        let nombreUsuario = '';
        if (sesion.usuario) {
            esAdministrador = sesion.usuario.roles.some(rol => rol.id === 1);
            esUsuario = sesion.usuario.roles.some(rol => rol.id === 2);
            logedin = true;
            nombreUsuario = sesion.usuario.nombre;
        }
        response.render('sin-permiso', {
            titulo: 'Sin Permiso',
            esUsuario: esUsuario,
            esAdministrador: esAdministrador,
            logedin: logedin,
            nombreUsuario: nombreUsuario,
        });
    }
}
