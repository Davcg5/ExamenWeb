import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import {PacienteEntity} from "./paciente-entity";

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(PacienteEntity)
        private readonly _pacienteRepository: Repository<PacienteEntity>,
    ) {}

    buscar(parametros?: FindManyOptions<PacienteEntity>): Promise<PacienteEntity[]> {
        return this._pacienteRepository.find(parametros);
    }

    async crear(nuevoPaciente: PacienteEntity): Promise<PacienteEntity> {
        const pacienteEntity = this._pacienteRepository.create(nuevoPaciente);

        const pacienteCreado = await this._pacienteRepository.save(pacienteEntity);

        return pacienteCreado;
    }

    actualizar(
        idPaciente: number,
        nuevoPaciente: PacienteEntity,
    ): Promise<PacienteEntity> {
        nuevoPaciente.id = idPaciente;

        const pacienteEntity = this._pacienteRepository.create(nuevoPaciente);

        return this._pacienteRepository.save(pacienteEntity);
    }

    borrar(idPaciente: number): Promise<PacienteEntity> {
        const pacienteEntityAEliminar = this._pacienteRepository.create({
            id: idPaciente,
        });

        return this._pacienteRepository.remove(pacienteEntityAEliminar);
    }

    buscarPorId(idPaciente: number): Promise<PacienteEntity> {
        return this._pacienteRepository.findOne(idPaciente);
    }
}
