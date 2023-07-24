import { TransformFnParams } from 'class-transformer';

export class TransformUtils {
  static stringToNumber(params: TransformFnParams): number {
    const value = params.value as string;
    return parseInt(value, 10);
  }
}
