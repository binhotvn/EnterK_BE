import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { UtilsService } from 'src/utils/utils.service';
import { EventsDocument } from './schemas/events.schema';
import { Model } from 'mongoose';
import { IncomeChatDto } from './dto/chat.created.dto';
import { MapiService } from 'src/utils/master-api/mapi.service';


// websocket gateway at http://localhost:3003/rt/events
// enable cors
@WebSocketGateway({ namespace: 'rtc' , cors: {origin: '*'}})
export class EventsGateway {
  constructor(
    @InjectModel('Chat') private readonly chatModel: Model<EventsDocument>,
    private readonly utils: UtilsService,
    private readonly mapi: MapiService
    ){}
  @WebSocketServer()
  server: Server;


  @SubscribeMessage('chat_in')
  async identity(@MessageBody() data_raw: string): Promise<any>  {
    console.log('incoming', data_raw)
    if (this.utils.isJsonString(data_raw)){
      const data = JSON.parse(data_raw);
      const newMessageInDb = new this.chatModel({
        chat_origin: data.message,
        owner: data.from,
        chat_translated: [
          {lang_key: 'VI', language: "VIETNAMESE", content: (await this.mapi.getTranslated(data.message,'vi')).data.translations[0].translatedText},
          {lang_key: 'EN', language: "ENGLISH", content: (await this.mapi.getTranslated(data.message,'en')).data.translations[0].translatedText},
          {lang_key: 'KO', language: "KOREAN", content: (await this.mapi.getTranslated(data.message,'ko')).data.translations[0].translatedText}
        ]
      })
      const result = await newMessageInDb.save()
      this.server.emit('chat', JSON.stringify(result));
      return {success: true, message: "SENT"}
    } else {
      return {success: false, message: "BAD_REQUEST" }
    }
    
  }
}
