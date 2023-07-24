import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorators/user.decorator';
import IUserInterface from 'src/user/user.interface';

@Controller('tasks')
//todo : make my own AuthGuard
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async addTask(@Body() taskDTO: TaskDTO, @User() user: IUserInterface) {
    taskDTO.userId = user.id;
    return this.taskService.addTask(taskDTO);
  }

  @Get('')
  async getTasks(@User() user: IUserInterface) {
    const userId = user.id;
    return this.taskService.getUserTasks(userId);
  }

  //todo: user @Query insted of Param
  @Get(':id')
  async getTask(@Param('id') id: number, @User() user: IUserInterface) {
    const userId = user.id;
    return this.taskService.getTaskById(id, userId);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() taskDTO: TaskDTO,
    @User() user: IUserInterface,
  ) {
    const userId = user.id;
    return this.taskService.updateTask(id, taskDTO, userId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number, @User() user: IUserInterface) {
    const userId = user.id;
    return this.taskService.deleteTask(id, userId);
  }
}
