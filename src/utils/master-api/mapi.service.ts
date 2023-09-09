import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../http.service';
import { AxiosRequestConfig } from 'axios';
import { UtilsService } from '../utils.service';
import {encode} from 'html-entities';

@Injectable()
export class MapiService {
  private readonly loggerService = new Logger('MAPI_SERVICE');
  private readonly httpService = new HttpService();
  private readonly MAPI_HOST = process.env.GOOGLE_TRANSLATE_HOST;
  private readonly API_KEY_GG = process.env.GOOGLE_TRANSLATE_KEY;

  private readonly utils = new UtilsService();

  async getTranslated(content: string, into_lg_code: string): Promise<any> { 
    const data = JSON.stringify({
      q: encode(content, {mode: 'extensive'}),
      target: into_lg_code,
      format: 'html',
    });
    return this.httpService.post(this.MAPI_HOST + '?key='+ this.API_KEY_GG, data);
  }
  

  async testSystem(): Promise<boolean> {
    return (await this.httpService.get(this.MAPI_HOST)) == 'pong';
  }
}