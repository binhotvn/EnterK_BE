import { SchemaFactory } from '@nestjs/mongoose';
import { Post } from '../entities/post.entity';

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
