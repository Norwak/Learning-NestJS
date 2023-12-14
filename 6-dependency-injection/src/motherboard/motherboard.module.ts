import { Module } from '@nestjs/common';
import { MotherboardController } from './motherboard.controller';
import { PowerModule } from 'src/power/power.module';
import { CpuModule } from 'src/cpu/cpu.module';
import { DiskModule } from 'src/disk/disk.module';

@Module({
  imports: [PowerModule, CpuModule, DiskModule],
  controllers: [MotherboardController],
})
export class MotherboardModule {}
