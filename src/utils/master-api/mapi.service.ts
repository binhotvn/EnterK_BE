import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../http.service';
import { AxiosRequestConfig } from 'axios';
import { UtilsService } from '../utils.service';
@Injectable()
export class MapiService {
  private readonly loggerService = new Logger('MAPI_SERVICE');
  private readonly httpService = new HttpService();
  private readonly MAPI_HOST = process.env.MAPI_URL;
  private readonly SISAPI_HOST = process.env.SISAPI_URL;
  private readonly utils = new UtilsService();

  async getTranslated(content: string, into_lg_code: string): Promise<any> {
    const data = JSON.stringify({
      q: content,
      target: into_lg_code,
      format: 'html',
    });

    return this.httpService.post(this.MAPI_HOST + '/login', data);
  }
  

  async testSystem(): Promise<boolean> {
    return (await this.httpService.get(this.MAPI_HOST)) == 'pong';
  }
}