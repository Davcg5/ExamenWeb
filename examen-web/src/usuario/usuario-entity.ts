import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany,
}from 'typeorm';

import {RolEntity} from "../rol/rol-entity";
import {PacienteEntity} from "../paciente/paciente-entity";


@Entity('usuario')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    password: string;

    @Column()
    fechaNacimiento: string;

    @ManyToMany(type => RolEntity)
    @JoinTable()
    roles: RolEntity[];

    @OneToMany(type => PacienteEntity, paciente => paciente.usuario)
    pacientes: PacienteEntity[];

}