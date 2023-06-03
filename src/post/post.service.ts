import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getAllPosts() {
    const posts = this.prisma.post.findMany({
      include: { categories: true },
    });
    return posts;
  }

  async getAllPostsBySpecificCategory(category: string) {
    const posts = await this.prisma.post.findMany({
      where: { categories: { some: { name: category } } },
      include: { categories: { where: { name: category } } },
    });
    return posts;
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async CreatePost(Post: PostDto) {
    var category = await this.prisma.category.findFirst({
      where: { id: Post.categoryId },
    });
    var post = await this.prisma.post.create({
      data: {
        title: Post.title,
        authorId: Post.userId,
        published: Post.published,
        categories: {
          connect: { id: category.id },
        },
      },
    });
    return post;
  }
  async test(postDto: PostDto) {
    const getAuthor = await this.prisma.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        posts: true, // All posts where authorId == 20
      },
    });
    return getAuthor;
    // Check if posts should be included in the query
  }
}
