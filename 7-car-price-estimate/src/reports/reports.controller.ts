import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(
    private reportsService: ReportsService
  ) {}
    
  @Post()
  @UseGuards(AuthGuard)
  async createReport(@CurrentUser() user: User, @Body() createReportDto: CreateReportDto) {
    return await this.reportsService.create(user, createReportDto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async approveReport(@Param('id') id: number, @Body() approveReportDto: ApproveReportDto) {
    return await this.reportsService.changeApproval(id, approveReportDto.approved);
  }
}
