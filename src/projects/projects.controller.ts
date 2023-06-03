import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private service : ProjectsService){}
  @Get()
  getProjectsList() {
    return  this.service.GetFirst();
  }
}
