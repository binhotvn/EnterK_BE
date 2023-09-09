import { IsNotEmpty } from "class-validator";

export class IncomeChatDto {
    @IsNotEmpty()
    from: string;

    @IsNotEmpty()
    message: string;
}