import { Injectable } from "@nestjs/common";
import { EventsDocument } from "./schemas/events.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class EventsService {
    constructor(
        @InjectModel('Chat') private readonly chatModel: Model<EventsDocument>,
        ){}

    getAllChat(){
        return this.chatModel.find().exec();
    }
}