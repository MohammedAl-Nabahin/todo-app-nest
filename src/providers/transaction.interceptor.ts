import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const sequelizeOptions = {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todolist',
    };
    const sequelize = new Sequelize(sequelizeOptions as any);

    const transaction: Transaction = await sequelize.transaction();

    try {
      const result = next.handle();
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
