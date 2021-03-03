import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';
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
  @IsInt()
  @Min(0)
  @Max(1)
  @IsOptional()
  readonly done: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  readonly dateAdded: Date | null;
}
