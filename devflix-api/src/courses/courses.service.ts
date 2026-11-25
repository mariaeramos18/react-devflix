import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategoriesWithCourses() {
    const categories = await this.prisma.category.findMany({
      include: { courses: { orderBy: { id: "asc" } } },
      orderBy: { createdAt: "asc" },
    });

    return categories.map((category) => ({
      id: category.slug,
      title: category.title,
      courses: category.courses.map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        videoId: course.videoId,
      })),
    }));
  }
}