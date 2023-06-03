import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  published: boolean;

  categoryId: number;
}
