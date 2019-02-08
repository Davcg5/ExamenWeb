import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario-entity";
import {RolEntity} from "./rol/rol-entity";
import {PacienteEntity} from "./paciente/paciente-entity";
import {MedicamentoEntity} from "./medicamento/medicamento-entity";
import {EventoEntity} from "./evento/evento-entity";
import {UsuarioModule} from "./usuario/usuario.module";
import {AdministradorModule} from "./administrador/administrador.module";
import {EventoModule} from "./evento/evento.module";
import {MedicamentoModule} from "./medicamento/medicamento.module";
import {PacienteModule} from "./paciente/paciente.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3302,
            username: 'root',
            password: 'password',
            database: 'examenWeb',
            synchronize: true,
            dropSchema: false,
            entities: [
                UsuarioEntity,
                RolEntity,
                PacienteEntity,
                MedicamentoEntity,
                EventoEntity,
            ],
        }),
        UsuarioModule,
        AdministradorModule,
        EventoModule,
        MedicamentoModule,
        PacienteModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
