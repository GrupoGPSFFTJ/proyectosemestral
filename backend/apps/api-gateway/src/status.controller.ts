import { All, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class StatusController {
  @Get('/')
  root(@Res() res: Response) {
    res.send('<html><body><h1>Todo está funcionando</h1></body></html>');
  }

  @All('*')
  notFound(@Res() res: Response) {
    res
      .status(200)
      .send('<html><body><h1>Todo está funcionando</h1></body></html>');
  }
}
