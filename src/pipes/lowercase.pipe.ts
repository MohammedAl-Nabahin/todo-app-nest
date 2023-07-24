import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class LowercasePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  }
}
