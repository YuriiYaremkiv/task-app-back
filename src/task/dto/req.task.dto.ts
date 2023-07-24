import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  Max,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformUtils } from '../../utils/transform.values';

export class RequestTaskDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  @Transform(TransformUtils.stringToNumber)
  readonly page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  @Transform(TransformUtils.stringToNumber)
  readonly limit?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly sort: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly query?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly labels?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly colors?: string;
}
