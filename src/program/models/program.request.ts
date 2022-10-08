import { IsEnum, IsString, MinLength } from 'class-validator';
import { Language } from './language';
import { ApiProperty } from '@nestjs/swagger';

export class ProgramRequest {
  @ApiProperty()
  @MinLength(1)
  @IsString()
  stdin: string;

  @ApiProperty()
  @IsEnum(Language)
  language: Language;
}
