import { Prop, Schema } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { MultiLanguageContent } from "src/posts/entities/post.entity";
import { v4 as uuidv4 } from 'uuid';
@Schema()
export class ChatMessage {
    @Prop({required: true, default: () => uuidv4()})
    _id: string;

    @Prop({required: true})
    owner: string;

    @Prop({required: true})
    chat_origin: string;

    @Prop({required: true, default: []})
    @Type(() => MultiLanguageContent)
    @ValidateNested({each: true})
    chat_translated: MultiLanguageContent[];

    @Prop({required: true, default: () => new Date()})
    createdAt: Date;
}

