import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotherboardModule } from './motherboard/motherboard.module';
import { CpuModule } from './cpu/cpu.module';
import { DiskModule } from './disk/disk.module';
import { PowerModule } from './power/power.module';

@Module({
  imports: [MotherboardModule, CpuModule, DiskModule, PowerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
