import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol')
export class RolEntity {
    // @ts-ignore
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}
