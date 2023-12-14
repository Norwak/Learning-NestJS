import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';
import { PowerService } from 'src/power/power.service';

@Controller()
export class MotherboardController {
  constructor(
    private powerService: PowerService,
    private cpuService: CpuService,
    private diskService: DiskService
  ) {}

  @Get()
  commands() {
    const watts = 1;

    console.log(`Drawing ${watts} watt of power`);
    this.powerService.supplyPower(watts);
    const compute = this.cpuService.compute(1,1);

    console.log(`Drawing ${watts} watt of power`);
    this.powerService.supplyPower(watts);
    const data = this.diskService.getData();

    return [compute, data];
  }
}
