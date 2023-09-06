import { IsNotEmpty } from "class-validator";

export class CreateTrendingDto {
    @IsNotEmpty({message: 'TITLE_REQUIRED'})
    title: string;

    @IsNotEmpty({message: 'SCORE_REQUIRED'})
    score: number;

    @IsNotEmpty({message: 'TYPE_REQUIRED'})
    type: string;
}
