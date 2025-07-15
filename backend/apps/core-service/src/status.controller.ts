import { Controller, Get, Res } from '@nestjs/common';
import { Public } from '@app/auth';
import { Response } from 'express';

@Controller()
export class StatusController {
  @Public()
  @Get('/')
  root(@Res() res: Response) {
    res.send('<html><body><h1>Todo está funcionando</h1></body></html>');
  }
}
