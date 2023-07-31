import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';
import { User } from 'src/decorators/user.decorator';
import IUserInterface from 'src/user/user.interface';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async addTask(@Body() taskDTO: TaskDTO, @User() user: IUserInterface) {
    taskDTO.userId = user.sub;
    return this.taskService.addTask(taskDTO);
  }

  @Get('')
  async getTasks(@User() user: IUserInterface) {
    const userId = user.sub;
    return this.taskService.getUserTasks(userId);
  }

  @Get(':id')
  async getTask(@Param('id') id: number, @User() user: IUserInterface) {
    const userId = user.sub;
    return this.taskService.getTaskById(id, userId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() taskDTO: TaskDTO,
    @User() user: IUserInterface,
  ) {
    const userId = user.sub;
    return this.taskService.updateTask(id, taskDTO, userId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @User() user: IUserInterface) {
    const userId = user.sub;
    return this.taskService.deleteTask(id, userId);
  }
}
