/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hi() {
    return 'con /sass/';
  }

  @Get('/tasks/')
  getTasks() {
    return this.appService.getTask();
  }
}
