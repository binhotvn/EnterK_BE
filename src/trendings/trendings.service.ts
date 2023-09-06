import { Injectable } from '@nestjs/common';
import { CreateTrendingDto } from './dto/create-trending.dto';
import { UpdateTrendingDto } from './dto/update-trending.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trending } from './entities/trending.entity';
import { TrendingDocument } from './schemas/trending.schema';
import { Model } from 'mongoose';
import { MapiService } from 'src/utils/master-api/mapi.service';
@Injectable()
export class TrendingsService {
  constructor(@InjectModel('Trending') private readonly trendingModel: Model<TrendingDocument>,
  private readonly mapi: MapiService){}

  findType(type: string){
    return this.trendingModel.find({type: type.toLowerCase( )}).sort({score: -1}).exec();  
  }

  async create(createTrendingDto: CreateTrendingDto) {
    const newPost = new this.trendingModel({
      title: createTrendingDto.title,
      type: createTrendingDto.type.toLowerCase(),
      score: createTrendingDto.score,
      translated: [
        {language: 'KOREAN', content: (await this.mapi.getTranslated(createTrendingDto.title,'ko')).data.translations[0].translatedText, lang_key: 'KO'},
        {language: 'ENGLISH', content: (await this.mapi.getTranslated(createTrendingDto.title,'en')).data.translations[0].translatedText, lang_key: 'EN'},
        {language: 'VIETNAMESE', content: (await this.mapi.getTranslated(createTrendingDto.title,'vi')).data.translations[0].translatedText, lang_key: 'VI'},


      ]
    })
    return newPost.save();
  }

  findAll() {
    return this.trendingModel.find().sort({score: -1}).exec();
  }

  findOne(id: string) {
    return this.trendingModel.findOne({_id: id}).exec();
  }

  update(id: string, updateTrendingDto: UpdateTrendingDto) {
    return this.trendingModel.updateOne({_id: id}, updateTrendingDto).exec(); 
  }

  remove(id: string) {
    return this.trendingModel.remove({_id: id}).exec(); 
  }
}
