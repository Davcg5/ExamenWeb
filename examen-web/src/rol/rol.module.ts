import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolEntity } from './rol-entity';
import { RolService } from './rol.service';

@Module({
    imports: [TypeOrmModule.forFeature([RolEntity])],
    controllers: [],
    providers: [RolService],
    exports: [RolService],
})
export class RolModule {}
