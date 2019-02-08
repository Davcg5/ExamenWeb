import { UsuarioModule } from './../usuario/usuario.module';
import {MedicamentoController} from "./medicamento.controller";

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import{MedicamentoService} from "./medicamento.service";
import {MedicamentoEntity} from "./medicamento-entity";
import {PacienteModule} from "../paciente/paciente.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MedicamentoEntity]),
        UsuarioModule,
        PacienteModule,
    ],
    controllers: [MedicamentoController],
    providers: [MedicamentoService],
    exports: [MedicamentoService],
})
export class MedicamentoModule {}
