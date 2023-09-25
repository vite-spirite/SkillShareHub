import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { nanoid } from 'nanoid';
import * as sharp from 'sharp';

@Injectable()
export class UploadBannerPipe implements PipeTransform<Express.Multer.File> {
  async transform(value: Express.Multer.File): Promise<string> {
    const name = nanoid(12);

    await sharp(value.buffer).resize(1235, 338, {fit: 'cover'}).webp().toFile(`./uploads/banners/${name}.webp`);

    return `${name}.webp`;
  }
}
