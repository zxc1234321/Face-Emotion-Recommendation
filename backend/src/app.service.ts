import { Get, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getDataFromExternalApi(): Observable<AxiosResponse<any>> {
    const url = 'https://localhost:5173';  // 요청할 외부 API의 URL
    return this.httpService.get(url).pipe(
      map(response => response.data)
    );
  }
  @Get()
  getHello(): string {
    return "Hello World!";
  }
}
