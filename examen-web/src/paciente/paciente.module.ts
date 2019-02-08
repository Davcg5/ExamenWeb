import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {PacienteEntity} from "./paciente-entity";

@Module({
    imports: [TypeOrmModule.forFeature([PacienteEntity])],
    controllers: [
        PacienteController
    ],
    providers: [
        PacienteService
    ],
    exports: [
        PacienteService
    ],
})
export class PacienteModule {}
