import { IsNotEmpty, IsUrl } from "class-validator";
import { Post } from "../entities/post.entity";

export class CreatePostDto{
    @IsNotEmpty({message: 'TITLE_REQUIRED'})
    title: string;

    @IsNotEmpty({message: 'CONTENT_REQUIRED'})
    content: string;

    @IsNotEmpty({message: 'DESCRIPTION_REQUIRED'})
    description: string;
    
    @IsUrl({}, {message: 'IMG_INVALID'})
    img: string;

}
