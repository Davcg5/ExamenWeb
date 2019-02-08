import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { EventoEntity } from './evento-entity';

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository: Repository<EventoEntity>,
    ) {}

    buscar(parametros?: FindManyOptions<EventoEntity>): Promise<EventoEntity[]> {
        return this._eventoRepository.find(parametros);
    }

    async crear(nuevoEvento: EventoEntity): Promise<EventoEntity> {
        const eventoEntity = this._eventoRepository.create(nuevoEvento);

        const eventoCreado = await this._eventoRepository.save(eventoEntity);

        return eventoCreado;
    }

    actualizar(
        idEvento: number,
        nuevoEvento: EventoEntity,
    ): Promise<EventoEntity> {
        nuevoEvento.id = idEvento;

        const eventoEntity = this._eventoRepository.create(nuevoEvento);

        return this._eventoRepository.save(eventoEntity);
    }

    borrar(idEvento: number): Promise<EventoEntity> {
        const eventoEntityAEliminar = this._eventoRepository.create({
            id: idEvento,
        });

        return this._eventoRepository.remove(eventoEntityAEliminar);
    }

    buscarPorId(idEvento: number): Promise<EventoEntity> {
        return this._eventoRepository.findOne(idEvento, {
            relations: ['jugadores'],
        });
    }
}
