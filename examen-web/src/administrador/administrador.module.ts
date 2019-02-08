import { UsuarioModule } from './../usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AdministradorController } from './administrador.controller';
import { RolModule } from 'src/rol/rol.module';

@Module({
    imports: [UsuarioModule, RolModule],
    controllers: [AdministradorController],
    providers: [],
    exports: [],
})
export class AdministradorModule {}
