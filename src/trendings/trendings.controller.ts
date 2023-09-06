import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrendingsService } from './trendings.service';
import { CreateTrendingDto } from './dto/create-trending.dto';
import { UpdateTrendingDto } from './dto/update-trending.dto';

@Controller('trendings')
export class TrendingsController {
  constructor(private readonly trendingsService: TrendingsService) {}

  @Post()
  create(@Body() createTrendingDto: CreateTrendingDto) {
    return this.trendingsService.create(createTrendingDto);
  }

  @Get()
  findAll() {
    return this.trendingsService.findAll();
  }

  @Get('type/:type')
  findType(@Param('type') type: string) { 

    return this.trendingsService.findType(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trendingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrendingDto: UpdateTrendingDto) {
    return this.trendingsService.update(id, updateTrendingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trendingsService.remove(id);
  }
}
