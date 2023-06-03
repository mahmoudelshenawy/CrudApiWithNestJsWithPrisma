import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class ProjectsService{
    constructor(private primsa : PrismaService){}

    GetFirst(){
        return this.primsa.user.findMany();
    }
}