import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepository: Repository<Report>,
  ) {}

  async create(user: User, createReportDto: CreateReportDto) {
    const report = this.reportRepository.create(createReportDto);
    report.user = user;
    return await this.reportRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepository.findOne({where: {id: id}});
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return await this.reportRepository.save(report);
  }
}
