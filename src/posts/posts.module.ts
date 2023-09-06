import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Posts', schema: PostSchema, collection: 'post' },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
