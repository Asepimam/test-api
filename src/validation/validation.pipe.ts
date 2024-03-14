import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = validateSync(object);
    if (errors.length > 0) {
      throw new BadRequestException(
        `Validation failed: ${this.formatErrors(errors)}`,
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    const isPrimitive = types.includes(metatype);
    const isPrimitiveArray = metatype === Array && types.includes(metatype[0]);
    return !isPrimitive && !isPrimitiveArray;
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((err) => {
        for (const property in err.constraints) {
          return err.constraints[property];
        }
      })
      .join(', ');
  }
}
