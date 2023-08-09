import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './dto/task.dto';
import { User } from 'src/decorators/user.decorator';
import IUserInterface from 'src/user/user.interface';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { TransactionInterceptor } from 'src/providers/transaction.interceptor';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async addTask(@Body() taskDTO: TaskDTO, @User() user: IUserInterface) {
    taskDTO.userId = user.sub;
    return this.taskService.addTask(taskDTO, user.sub);
  }

  @Get('')
  async getTasks(@User() user: IUserInterface) {
    const userId = user.sub;
    const role = user.role.toLowerCase();
    if (role == Role.Admin) {
      return this.taskService.getAllTasks();
    } else {
      return this.taskService.getUserTasks(userId);
    }
  }

  @Get(':id')
  async getTask(@Param('id') id: number, @User() user: IUserInterface) {
    const userId = user.sub;
    return this.taskService.getTaskById(id, userId);
  }

  @Patch(':id')
  @UseInterceptors(new TransactionInterceptor())
  // Only admins can edit tasks for testing
  @Roles(Role.Admin)
  async updateTask(
    @Param('id') id: number,
    @Body() taskDTO: TaskDTO,
    @User() user: IUserInterface,
  ) {
    const userId = user.sub;
    return await this.taskService.updateTask(id, taskDTO, userId);
  }

  @Delete(':id')
  @UseInterceptors(new TransactionInterceptor())
  @Roles(Role.User, Role.Admin)
  async deleteTask(@Param('id') id: number, @User() user: IUserInterface) {
    const userId = user.sub;
    return this.taskService.deleteTask(id, userId);
  }
}
