import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService
  ) {}
    
  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() createReportDto: CreateReportDto) {
    return await this.reportsService.create(createReportDto);
  }
}
