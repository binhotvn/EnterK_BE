import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { UtilsService } from "src/utils/utils.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsSchema } from "./schemas/events.schema";
import { MApiModule } from "src/utils/master-api/mapi.module";
import { ChatController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Chat", schema: EventsSchema, collection: "Chat" },
    ]),
    MApiModule,
  ],
  controllers: [ChatController],
  providers: [EventsService, UtilsService, EventsGateway],
})
export class EventsModule {}
