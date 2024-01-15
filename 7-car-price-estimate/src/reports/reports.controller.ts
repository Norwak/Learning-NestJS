import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService
  ) {}

  @Get()
  async getEstimate(@Query() getEstimateDto: GetEstimateDto) {
    return await this.reportsService.createEstimate(getEstimateDto);
  }
    
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(@CurrentUser() user: User, @Body() createReportDto: CreateReportDto) {
    return await this.reportsService.create(user, createReportDto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async approveReport(@Param('id') id: number, @Body() approveReportDto: ApproveReportDto) {
    return await this.reportsService.changeApproval(id, approveReportDto.approved);
  }
}
