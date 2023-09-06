import { IsNotEmpty } from "class-validator";
import { Post } from "../entities/post.entity";

export class CreatePostDto{
    @IsNotEmpty({message: 'TITLE_REQUIRED'})
    title: string;

    @IsNotEmpty({message: 'CONTENT_REQUIRED'})
    description: string;
}
