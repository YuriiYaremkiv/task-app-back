import {
  IsArray,
  IsString,
  MaxLength,
  ValidateNested,
  IsDefined,
} from 'class-validator';

class Label {
  @IsString()
  @MaxLength(40)
  color: string;

  @IsString()
  @MaxLength(100)
  text: string;
}

export class CreateBoardDto {
  @IsString()
  @MaxLength(40)
  @IsDefined()
  title: string;

  @IsString()
  @MaxLength(20)
  @IsDefined()
  color: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsDefined()
  labels: Label[];

  @IsArray()
  @IsDefined()
  cards: [];
}
