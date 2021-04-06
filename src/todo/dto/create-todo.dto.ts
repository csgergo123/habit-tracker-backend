import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import * as moment from 'moment';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({
    default: 'lightblue',
    description: 'The color of the todo in the frontend.',
  })
  @IsOptional()
  readonly color: string | null;

  @ApiPropertyOptional({
    description: 'Is the todo done.',
  })
  @IsOptional()
  readonly done: number | null;

  @ApiProperty({
    default: moment().format('YYYY-MM-DD'),
  })
  readonly issueDate: Date;
}
