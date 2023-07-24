import {
  Min,
  Max,
  IsArray,
  IsString,
  IsNumber,
  IsDefined,
  IsBoolean,
  MaxLength,
  IsDateString,
  ValidateNested,
} from 'class-validator';

class Task {
  @IsDefined()
  @IsString()
  @MaxLength(120)
  id: string;

  @IsDefined()
  @IsString()
  @MaxLength(100)
  text: string;

  @IsDefined()
  @IsBoolean()
  completed: boolean;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;
}

class Label {
  @IsDefined()
  @IsString()
  @MaxLength(40)
  color: string;

  @IsDefined()
  @IsString()
  @MaxLength(100)
  text: string;
}

class Card {
  @IsDefined()
  @IsString()
  @MaxLength(120)
  id: string;

  @IsDefined()
  @IsString()
  @MaxLength(40)
  title: string;

  @IsDefined()
  @IsString()
  @MaxLength(200)
  desc: string;

  @IsDefined()
  @IsDateString()
  @MaxLength(100)
  date: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  tasks: Task[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  labels: Label[];
}

export class BoardDto {
  @IsDefined()
  @IsString()
  @MaxLength(40)
  title: string;

  @IsDefined()
  @IsString()
  @MaxLength(20)
  color: string;

  @IsDefined()
  @IsString()
  @MaxLength(70)
  created: string;

  @IsDefined()
  @IsString()
  @MaxLength(70)
  updated: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  labels: Label[];

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  cards: Card[];
}
