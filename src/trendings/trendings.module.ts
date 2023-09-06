import { Module } from '@nestjs/common';
import { TrendingsService } from './trendings.service';
import { TrendingsController } from './trendings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrendingSchema } from './schemas/trending.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Trending', schema: TrendingSchema, collection: 'trending' },
  ]),],
  controllers: [TrendingsController],
  providers: [TrendingsService]
})
export class TrendingsModule {}
