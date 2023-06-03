import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPost() {
    return this.postService.getAllPosts();
  }
  @Get('c')
  async getAllPostsBySpecificCategory(@Query('category') category: string) {
    return await this.postService.getAllPostsBySpecificCategory(category);
  }

  @Get('categories')
  getAllCategories() {
    return this.postService.getAllCategories();
  }

  @Post()
  Create(@Body() postDto: PostDto) {
    return this.postService.CreatePost(postDto);
  }
}
