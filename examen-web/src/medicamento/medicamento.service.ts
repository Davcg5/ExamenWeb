import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import {MedicamentoEntity} from "./medicamento-entity";

@Injectable()
export class MedicamentoService {
    constructor(
        @InjectRepository(MedicamentoEntity)
        private readonly _medicamentoRepository: Repository<MedicamentoEntity>,
    ) {}

    buscar(
        parametros?: FindManyOptions<MedicamentoEntity>,
    ): Promise<MedicamentoEntity[]> {
        return this._medicamentoRepository.find(parametros);
    }

    async crear(nuevoMedicamento: MedicamentoEntity): Promise<MedicamentoEntity> {
        const medicamentoEntity = this._medicamentoRepository.create(nuevoMedicamento);

        const medicamentoCreado = await this._medicamentoRepository.save(medicamentoEntity);

        return medicamentoCreado;
    }

    actualizar(
        idMedicamento: number,
        nuevoMedicamento: MedicamentoEntity,
    ): Promise<MedicamentoEntity> {
        nuevoMedicamento.id = idMedicamento;

        const medicamentoEntity = this._medicamentoRepository.create(nuevoMedicamento);

        return this._medicamentoRepository.save(medicamentoEntity);
    }

    borrar(idMedicamento: number): Promise<MedicamentoEntity> {
        const medicamentoEntityAEliminar = this._medicamentoRepository.create({
            id: idMedicamento,
        });

        return this._medicamentoRepository.remove(medicamentoEntityAEliminar);
    }

    buscarPorId(idJugador: number): Promise<MedicamentoEntity> {
        return this._medicamentoRepository.findOne(idJugador, {
            relations: ['eventos', 'paciente'],
        });
    }
}
