import { Injectable } from '@nestjs/common';
import { CreateTrendingDto } from './dto/create-trending.dto';
import { UpdateTrendingDto } from './dto/update-trending.dto';

@Injectable()
export class TrendingsService {
  create(createTrendingDto: CreateTrendingDto) {
    return 'This action adds a new trending';
  }

  findAll() {
    return `This action returns all trendings`;
  }

  findOne(id: string) {
    return `This action returns a #${id} trending`;
  }

  update(id: string, updateTrendingDto: UpdateTrendingDto) {
    return `This action updates a #${id} trending`;
  }

  remove(id: string) {
    return `This action removes a #${id} trending`;
  }
}
