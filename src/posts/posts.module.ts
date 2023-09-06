import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/posts.schema';
import { MApiModule } from 'src/utils/master-api/mapi.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Posts', schema: PostSchema, collection: 'post' },
    ]),
    MApiModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
