import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Task {
  @IsString()
  id: string;

  @IsBoolean()
  completed: boolean;

  @IsString()
  text: string;

  progress: number;
}

class Label {
  @IsString()
  color: string;

  @IsString()
  text: string;
}

class Card {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Task)
  tasks: Task[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Label)
  labels: Label[];
}

export class CreateBoardDto {
  @IsString()
  title: string;

  labels: [];
  color: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Card)
  cards: Card[];
}
