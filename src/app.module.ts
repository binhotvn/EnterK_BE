import {  Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { UtilsService } from './utils/utils.service';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import { TrendingsModule } from './trendings/trendings.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    EventsModule,

    CacheModule.register(),
    UsersModule,
    AuthModule,
    PostsModule,
    PostsModule,
    TrendingsModule,
    
  ],
  // controllers: [AppController],
  providers: [
    AppService,
    UtilsService,
  ],
})
export class AppModule {}
