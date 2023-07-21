import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  //Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async addTask(@Body() taskDTO: TaskDTO) {
    return this.taskService.addTask(taskDTO);
  }

  @Get(':id')
  async getTask(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Get('user/:userId')
  async getUserTasks(@Param('userId') userId: number) {
    return this.taskService.getUserTasks(userId);
  }

  //   @Put(':id')
  //   async updateTask(@Param('id') id: number, @Body() taskDTO: TaskDTO) {
  //     return this.taskService.updateTask(id, taskDTO);
  //   }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
