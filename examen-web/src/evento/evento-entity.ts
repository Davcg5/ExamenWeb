import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';


import {MedicamentoEntity} from "../medicamento/medicamento-entity";
@Entity('evento')
export class EventoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    fecha: string;

    @Column()
    latitud: string;

    @Column()
    longitud: string;

    @ManyToMany(type => MedicamentoEntity, medicamento => medicamento.eventos)
    medicamentos: MedicamentoEntity[];
}
