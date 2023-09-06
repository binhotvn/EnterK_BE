import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PostDocument } from './schemas/posts.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Posts') private readonly postModel: Model<PostDocument>) {}
  create(createPostDto: CreatePostDto) {
    const newPost = new this.postModel({
      content_origin: createPostDto.description,
      title: createPostDto.title,
      owner: 'KA'
    });
    return newPost.save();

  }

  findAll() {
    return this.postModel.find().sort({createdAt: -1}).exec();
  }

  findOne(id: number) {
    return this.postModel.findOne({_id: id}).exec();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postModel.updateOne({_id: id}, updatePostDto).exec( );
  }

  remove(id: number) {
    return this.postModel.remove({_id: id}).exec();
  }
}
