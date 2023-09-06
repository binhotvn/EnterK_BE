import { SchemaFactory } from '@nestjs/mongoose';
import { Trending } from '../entities/trending.entity';

export type TrendingDocument = Trending & Document;

export const TrendingSchema = SchemaFactory.createForClass(Trending);
