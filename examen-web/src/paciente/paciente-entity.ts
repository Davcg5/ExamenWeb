import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany,
}from 'typeorm';
import {UsuarioEntity} from "../usuario/usuario-entity";
import {MedicamentoEntity} from "../medicamento/medicamento-entity";

@Entity('paciente')
export class PacienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;


    @Column()
    hijos: number;

    @Column()
    tieneSeguro: boolean;

    @ManyToOne(type => UsuarioEntity, usuario => usuario.pacientes)
    usuario: UsuarioEntity;

    @OneToMany(type => MedicamentoEntity, medicamento => medicamento.paciente)
    medicamentos: MedicamentoEntity[];
}

