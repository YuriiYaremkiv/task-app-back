import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Label {
  @IsString()
  color: string;

  @IsString()
  text: string;
}

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  color: string;

  @IsArray()
  @Type(() => Label)
  @ValidateNested({ each: true })
  labels: Label[];

  @IsArray()
  cards: [];
}
