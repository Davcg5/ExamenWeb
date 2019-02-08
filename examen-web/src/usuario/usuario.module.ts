import {UsuarioService} from "./usuario.service";
import { UsuarioController } from './usuario.controller';
import { UsuarioEntity } from './usuario-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolModule } from 'src/rol/rol.module';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity]), RolModule],
    controllers: [UsuarioController],
    providers: [UsuarioService],
    exports: [UsuarioService],
})
export class UsuarioModule {}