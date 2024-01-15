import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/entities/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  async createEstimate({make, model, lng, lat, year, mileage}: GetEstimateDto) {
    return this.reportRepository.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', {make})
      .andWhere('model = :model', {model})
      .andWhere('lng - :lng BETWEEN -5 AND 5', {lng})
      .andWhere('lat - :lat BETWEEN -5 AND 5', {lat})
      .andWhere('year - :year BETWEEN -3 AND 3', {year})
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'ASC')
      .setParameters({mileage})
      .limit(3)
      .getRawOne();
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
