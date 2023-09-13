import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PostDocument } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { MapiService } from 'src/utils/master-api/mapi.service';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Posts') private readonly postModel: Model<PostDocument>, private readonly mapi: MapiService) {}
  async create(createPostDto: CreatePostDto) {
    console.log('New post coming', createPostDto.title)
    createPostDto.content = Buffer.from(createPostDto.content, 'base64').toString('utf-8');

    const newPost = new this.postModel({
      description: createPostDto.description,
      description_translated: [
        {language: 'KOREAN', content: (await this.mapi.getTranslated(createPostDto.description, 'ko')).data.translations[0].translatedText, lang_key: 'KO'},
        {language: 'VIETNAMESE', content: (await this.mapi.getTranslated(createPostDto.description, 'vi')).data.translations[0].translatedText, lang_key: 'VI'},
        {language: 'ENGLISH', content: (await this.mapi.getTranslated(createPostDto.description, 'en')).data.translations[0].translatedText, lang_key: 'EN'},
        {language: 'SPANISH', content: (await this.mapi.getTranslated(createPostDto.description, 'es')).data.translations[0].translatedText, lang_key: 'ES'},
        {language: 'HINDI', content: (await this.mapi.getTranslated(createPostDto.description, 'hi')).data.translations[0].translatedText, lang_key: 'HI'},
        {language: 'JAPANESE', content: (await this.mapi.getTranslated(createPostDto.description, 'ja')).data.translations[0].translatedText, lang_key: 'JA'},

      ],
      content_origin: createPostDto.content,
      title: createPostDto.title,
      title_translated: [
        {language: 'KOREAN', content: (await this.mapi.getTranslated(createPostDto.title, 'ko')).data.translations[0].translatedText, lang_key: 'KO'},
        {language: 'VIETNAMESE', content: (await this.mapi.getTranslated(createPostDto.title, 'vi')).data.translations[0].translatedText, lang_key: 'VI'},
        {language: 'ENGLISH', content: (await this.mapi.getTranslated(createPostDto.title, 'en')).data.translations[0].translatedText, lang_key: 'EN'},
        {language: 'SPANISH', content: (await this.mapi.getTranslated(createPostDto.title, 'es')).data.translations[0].translatedText, lang_key: 'ES'},
        {language: 'HINDI', content: (await this.mapi.getTranslated(createPostDto.title, 'hi')).data.translations[0].translatedText, lang_key: 'HI'},
        {language: 'JAPANESE', content: (await this.mapi.getTranslated(createPostDto.title, 'ja')).data.translations[0].translatedText, lang_key: 'JA'},

      ],
      img: createPostDto.img,
      owner: 'KA',
  
      content_translated: [
        {language: 'KOREAN', content: (await this.mapi.getTranslated(createPostDto.content, 'ko')).data.translations[0].translatedText, lang_key: 'KO'},
        {language: 'VIETNAMESE', content: (await this.mapi.getTranslated(createPostDto.content, 'vi')).data.translations[0].translatedText, lang_key: 'VI'},
        {language: 'ENGLISH', content: (await this.mapi.getTranslated(createPostDto.content, 'en')).data.translations[0].translatedText, lang_key: 'EN'},
        {language: 'SPANISH', content: (await this.mapi.getTranslated(createPostDto.content, 'es')).data.translations[0].translatedText, lang_key: 'ES'},
        {language: 'ENGLISH', content: (await this.mapi.getTranslated(createPostDto.content, 'hi')).data.translations[0].translatedText, lang_key: 'HI'},
        {language: 'JAPANESE', content: (await this.mapi.getTranslated(createPostDto.content, 'ja')).data.translations[0].translatedText, lang_key: 'JA'},

      ]
    });
    return newPost.save();

  }

  findAll() {
    return this.postModel.find().sort({createdAt: -1}).exec();
  }

  findOne(id: string) {
    return this.postModel.findOne({_id: id}).exec();
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({_id: id}, updatePostDto).exec( );
  }

  remove(id: string) {
    return this.postModel.remove({_id: id}).exec();
  }
}
