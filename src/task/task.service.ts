import { ForbiddenException, Injectable } from '@nestjs/common';
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
    const task = this.taskModel.findOne({
      where: { id },
    });
    if ((await task).userId !== loggedInUserId) {
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
      throw new Error('Task not found');
    }
    const task = await this.getTaskById(id, loggedInUserId);

    if (task.userId !== loggedInUserId) {
      throw new ForbiddenException(
        'You do not have permission to update this task',
      );
    }

    return this.taskModel.findByPk(id);
  }

  async deleteTask(id: number, loggedInUserId: number): Promise<number> {
    const task = await this.getTaskById(id, loggedInUserId);
    if (task) {
      return this.taskModel.destroy({
        where: { id },
      });
    } else {
      throw new ForbiddenException(
        'You do not have permission to delete this task',
      );
    }
  }
}
