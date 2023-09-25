import { Injectable, PipeTransform } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as sharp from 'sharp';

@Injectable()
export class UploadPipe implements PipeTransform<Express.Multer.File> {
  async transform(value: Express.Multer.File): Promise<string> {
    const name = nanoid(12);

    await sharp(value.buffer).resize(256, 256, {fit: 'fill'}).webp().toFile(`./uploads/avatars/${name}.webp`);

    return `${name}.webp`;
  }
}
