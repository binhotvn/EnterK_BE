import { Prop, Schema } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class MultiLanguageContent {
  @Prop({ required: true })
  language: string;
  @Prop({ required: true })
  lang_key: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true, default: "GOOGLE_TRANSLATE" })
  source: string;
}

@Schema()
export class Post {
  @Prop({ required: true, default: () => uuidv4() })
  _id: UUID;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  @Type(() => MultiLanguageContent)
  @ValidateNested({ each: true })
  title_translated: MultiLanguageContent[];
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  @Type(() => MultiLanguageContent)
  @ValidateNested({ each: true })
  description_translated: MultiLanguageContent[];
  @Prop({ required: true })
  content_origin: string;

  @Prop({ required: true, default: [] })
  @Type(() => MultiLanguageContent)
  @ValidateNested({ each: true })
  content_translated: MultiLanguageContent[];

  @Prop({ required: true, default: "SELF" })
  source: string;
  @Prop({ required: true, default: "OWNER" })
  owner: string;
  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: true, default: "" })
  img: string;
  @Prop({ required: true, default: () => new Date() })
  modifiedAt: Date;

  @Prop({required: true, default: []})
  tag: string[]
}

