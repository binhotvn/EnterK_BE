import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../http.service';
import { AxiosRequestConfig } from 'axios';
import { UtilsService } from '../utils.service';
import { encode } from 'html-entities';

@Injectable()
export class MapiService {
  private readonly loggerService = new Logger('MAPI_SERVICE');
  private readonly httpService = new HttpService();
  private readonly MAPI_HOST = process.env.GOOGLE_TRANSLATE_HOST;
  private readonly API_KEY_GG = process.env.GOOGLE_TRANSLATE_KEY;
  private readonly API_KEY_GPT = process.env.CHATGPT_API_KEY;


  private readonly utils = new UtilsService();

  async getTranslated(content: string, into_lg_code: string): Promise<any> {
    const data = JSON.stringify({
      q: encode(content, { mode: 'extensive' }),
      target: into_lg_code,
      format: 'html',
    });
    return this.httpService.post(this.MAPI_HOST + '?key=' + this.API_KEY_GG, data);
  }


  async chatGPTContent(content: string): Promise<any> {
    const data = JSON.stringify({
      "model": "gpt-3.5-turbo-16k-0613",
      "messages": [
        { "role": "system", "content": "Extract the keyword and evaluate the categories of the post. Examples: 'F.T. Island have dropped their highlight medley for 'Sage'. The preview video gives a teaser of 'Sage', 'All Of My Life', 'I'm Still Here', 'Broken', 'Not Enough', and 'Rising Star'. 'Sage' is F.T. Island's 9th mini album set to drop on September 7 KST. Check out F.T. Island's highlight medley above, and let us know what you think in the comments below.' into [{'key': 'KPOP', 'score': 0.9},{'key':'F.T. Island', 'score': 1}] send 25 keyword fit to content at full json like that, 'key' only 1-2 words. Only return json object" },
        { "role": "user", "content": `Get keyword from \n '${content}\n` }
      ],
      "max_tokens": 2048

    });
    return this.httpService.post_token('https://api.openai.com/v1/chat/completions', this.API_KEY_GPT, data);
  }


  async testSystem(): Promise<boolean> {
    return (await this.httpService.get(this.MAPI_HOST)) == 'pong';
  }
}