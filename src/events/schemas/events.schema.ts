import { SchemaFactory } from '@nestjs/mongoose';
import { ChatMessage } from '../entities/events.entity';

export type EventsDocument = ChatMessage & Document;

export const EventsSchema = SchemaFactory.createForClass(ChatMessage);
