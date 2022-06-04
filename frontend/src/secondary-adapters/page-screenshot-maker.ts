import { AxiosResponse } from 'axios';

const axios = require('axios').default;

export class PageScreenshotMaker {
  async takeBase64(url: string): Promise<string> {
    console.log('start take');
    return axios.post('http://localhost:3334/screenshot/base64', {
      url,
    })
      .then((response: AxiosResponse<{base64: string}>) => response.data.base64)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
  }
}
