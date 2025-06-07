import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      throw new BadRequestException(
        `Validation failed. ${value} is not an integer`,
      );
    }
    return newValue;
  }
}
