import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async addTask(
    @Body(new ValidationPipe()) taskDTO: TaskDTO,
    @Request() req: any,
  ) {
    const id = parseInt(req.user.dataValues.id);
    taskDTO.userId = id;
    return this.taskService.addTask(taskDTO);
  }

  @Get('')
  async getTasks(@Request() req: any) {
    const id = parseInt(req.user.dataValues.id);
    const loggedInUserId = id;
    return this.taskService.getUserTasks(loggedInUserId);
  }

  @Get(':id')
  async getTask(@Param('id', ValidationPipe) id: number, @Request() req: any) {
    const userId = parseInt(req.user.dataValues.id);
    const loggedInUserId = userId;
    return this.taskService.getTaskById(id, loggedInUserId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body(new ValidationPipe()) taskDTO: TaskDTO,
    @Request() req: any,
  ) {
    const userId = parseInt(req.user.dataValues.id);
    const loggedInUserId = userId;
    return this.taskService.updateTask(id, taskDTO, loggedInUserId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Request() req: any) {
    const userId = parseInt(req.user.dataValues.id);
    const loggedInUserId = userId;
    return this.taskService.deleteTask(id, loggedInUserId);
  }
}
