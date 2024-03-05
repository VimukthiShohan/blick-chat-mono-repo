import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '../user/guards/jwt-auth.guard';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('media')
export class MediaController {
  @Post('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: process.env.UPLOADS_PATH,
      storage: diskStorage({
        destination: process.env.UPLOADS_PATH,
        filename: (req, res, cb) => cb(null, `${Date.now()}.jpg`),
      }),
    }),
  )
  uploadMedia(@UploadedFile() file: Express.Multer.File) {
    return file.filename;
  }

  @Get(':filename')
  getMedia(@Param('filename') filename: string, @Res() res: Response) {
    const file = createReadStream(
      join(`${process.env.UPLOADS_PATH}`, filename),
    );

    file.pipe(res);
  }
}
