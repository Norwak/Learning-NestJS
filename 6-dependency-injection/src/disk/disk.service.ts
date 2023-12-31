import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    const watts = 20;

    console.log(`Drawing ${watts} watts of power`);
    this.powerService.supplyPower(watts);
    return 'data';
  }
}
