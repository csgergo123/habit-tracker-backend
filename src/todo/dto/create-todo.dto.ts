import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';
export class CreateTodoDto {
  @ApiProperty({
    example: 'First todo',
    description: 'The title of the todo.',
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({
    default: 'lightblue',
    description: 'The color of the todo in the frontend.',
  })
  @IsString()
  readonly color: string | null;

  @ApiPropertyOptional({
    description: 'Is the todo done.',
  })
  @IsInt()
  @Min(0)
  @Max(1)
  readonly done: number;

  @ApiPropertyOptional({
    description: 'The datetime when the todo was created.',
  })
  @IsString()
  readonly dateAdded: Date | null;
}
