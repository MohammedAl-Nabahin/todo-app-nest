import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async addTask(taskDTO: TaskDTO): Promise<Task> {
    const task = new Task();
    task.title = taskDTO.title;
    task.description = taskDTO.description;
    task.userId = taskDTO.userId;

    return task.save();
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return this.taskModel.findAll({
      where: { userId },
    });
  }

  async getTaskById(id: number, loggedInUserId: number): Promise<Task | null> {
    const task = await this.taskModel.findOne({
      where: { id },
    });
    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (task.userId !== loggedInUserId) {
      throw new ForbiddenException(
        'You do not have permission to view this task',
      );
    }
    return task || null;
  }

  async updateTask(
    id: number,
    taskDTO: TaskDTO,
    loggedInUserId: number,
  ): Promise<Task> {
    const [affectedCount] = await this.taskModel.update(taskDTO, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    const task = await this.checkTask(
      id,
      loggedInUserId,
      'You do not have permission to update this task',
    );

    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (task.userId !== loggedInUserId) {
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }
    return this.taskModel.findByPk(id);
  }

  async deleteTask(id: number, loggedInUserId: number): Promise<number> {
    const task = await this.taskModel.findOne({
      where: { id },
    });

    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    if (task) {
      if (task.userId !== loggedInUserId) {
        throw new ForbiddenException(
          'You do not have permission to delete this task',
        );
      } else {
        return this.taskModel.destroy({
          where: { id },
        });
      }
    }
  }

  async checkTask(
    id: number,
    loggedInUserId: number,
    Error: string,
  ): Promise<Task | null> {
    const task = await this.taskModel.findOne({
      where: { id },
    });
    if (!task) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (task.userId !== loggedInUserId) {
      throw new ForbiddenException(`${Error}`);
    }
    return task || null;
  }
}
