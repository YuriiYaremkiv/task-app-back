import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from '../schema/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getBoards(user: any) {
    try {
      const boards = await this.taskModel.find({ userId: user._id });
      return boards;
    } catch (err) {
      throw new Error(err.messate);
    }
  }

  async addBoard({ user, taskDto }) {
    try {
      const board = await this.taskModel.findOne({ userId: user._id });

      if (board) {
        const updatedBoard = await this.taskModel.findOneAndUpdate(
          { userId: user._id },
          { $push: { boards: { id: uuidv4(), ...taskDto } } },
          { new: true },
        );

        return updatedBoard.boards.pop();
      } else {
        const createdBoard = await this.taskModel.create({
          userId: user._id,
          boards: [{ id: uuidv4(), ...taskDto }],
        });

        return createdBoard.boards.pop();
      }
    } catch (err) {
      throw new Error(err.messate);
    }
  }

  async updateBoard({ user, boardId, taskDto }) {
    console.log('this is console', user, boardId, taskDto);
    try {
      const updatedTask = await this.taskModel.findOneAndUpdate(
        { userId: user._id, 'boards.id': boardId },
        { $set: { 'boards.$': { id: boardId, ...taskDto } } },
        { new: true },
      );

      return updatedTask.boards.find((board) => board.id === boardId);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteBoard({ user, boardId }) {
    try {
      await this.taskModel.findOneAndUpdate(
        { userId: user._id },
        { $pull: { boards: { id: boardId } } },
        { new: true },
      );

      return boardId;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
