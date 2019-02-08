
import { Module } from '@nestjs/common';
import { UsuarioModule } from './../usuario/usuario.module';
import { EventoController } from './evento.controller';
import { EventoEntity } from './evento-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MedicamentoModule} from "../medicamento/medicamento.module";
import {EventoService} from "./evento.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([EventoEntity]),
        MedicamentoModule,
        UsuarioModule,
    ],
    controllers: [EventoController],
    providers: [EventoService],
    exports: [EventoService],
})
export class EventoModule {}
