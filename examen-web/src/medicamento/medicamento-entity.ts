import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable,}from 'typeorm';


import {PacienteEntity} from "../paciente/paciente-entity";
import {EventoEntity} from "../evento/evento-entity";

@Entity('medicamento')
export class MedicamentoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal",
        { precision: 5, scale: 2 })
    gramosAIngerir: number;

    @Column()
    nombre: string;

    @Column()
    composicion: string;

    @Column()
    usadoPara: string;

    @Column()
    fechaCaducidad: string;

    @Column()
    numeroPastillas: number;

    @ManyToMany(type => EventoEntity, evento => evento.medicamentos)
    @JoinTable()
    eventos: EventoEntity[];

    @ManyToOne(type => PacienteEntity, paciente => paciente.medicamentos)
    paciente: PacienteEntity;
}