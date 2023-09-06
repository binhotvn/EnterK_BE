import { Prop, Schema } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { MultiLanguageContent } from "src/posts/entities/post.entity";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Trending {
    @Prop({ required: true, default: () => uuidv4() })
    _id: string;

    @Prop({ required: true })
    title: string;

    @Prop({required: true})
    @Type(() => MultiLanguageContent)
    @ValidateNested({ each: true })
    translated: MultiLanguageContent[];

    @Prop({required: true, default: () => new Date()})
    time_created: Date;

    @Prop({required: true, default: () => new Date()})
    time_modified: Date;

    @Prop({required: true, default: 0})
    score: Number;

    
}
