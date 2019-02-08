import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, getRepository } from 'typeorm';
import { RolEntity } from './rol-entity';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>,
    ) {}

    buscar(parametros?: FindManyOptions<RolEntity>): Promise<RolEntity[]> {
        return this._rolRepository.find(parametros);
    }
}

export interface Rol {
    id: number;
    nombre: string;
}
