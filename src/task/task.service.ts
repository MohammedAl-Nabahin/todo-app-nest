import { Injectable } from '@nestjs/common';
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
    return this.taskModel.create(taskDTO);
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.taskModel.findByPk(id);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return this.taskModel.findAll({
      where: { userId },
    });
  }

  //   async updateTask(id: number, taskDTO: TaskDTO): Promise<[number, Task[]]> {
  //     return this.taskModel.update(taskDTO, {
  //       where: { id },
  //     });
  //   }

  async deleteTask(id: number): Promise<number> {
    return this.taskModel.destroy({
      where: { id },
    });
  }
}
