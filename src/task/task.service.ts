import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from '../schema/task.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getCards() {
    return 'hello this will be your card';
  }
}
