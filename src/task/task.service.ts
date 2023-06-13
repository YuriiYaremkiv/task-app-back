import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from '../schema/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { paginationParams } from '../config/pagination';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getBoards({ user, queryParam }: any) {
    const { query, labels, colors } = queryParam;
    const { skip, limit } = paginationParams(queryParam);

    const result: any = await this.taskModel.findOne({ userId: user.id });
    const boards = result ? result.boards : [];
    const totalBoards = boards.length;

    const filteredResult = boards.filter((board: any) => {
      if (query && !board.title.toLowerCase().includes(query.toLowerCase()))
        return false;

      if (labels && labels.length === 0) return false;
      if (labels) {
        const setOfLabels = new Set(
          board.labels.map((item: any) => item.label),
        );
        const arrayOfSearchLabels = labels.split(',');
        for (const searchLabel of arrayOfSearchLabels) {
          if (!setOfLabels.has(searchLabel)) return false;
        }
      }

      if (colors && board.color.length === 0) return false;
      if (colors) {
        const setOfColors = new Set(colors.split(','));
        if (!setOfColors.has(board.color)) return false;
      }

      return true;
    });

    const slicedBoards = filteredResult.slice(skip, skip + +limit);

    return { boards: slicedBoards, totalBoards };
  }

  async addBoard({ user, taskDto }) {
    try {
      const board = await this.taskModel.findOne({ userId: user.id });

      if (board) {
        const updatedBoard = await this.taskModel.findOneAndUpdate(
          { userId: user.id },
          { $push: { boards: { id: uuidv4(), ...taskDto } } },
          { new: true },
        );

        return { boards: updatedBoard.boards };
      } else {
        const createdBoard = await this.taskModel.create({
          userId: user.id,
          boards: [{ id: uuidv4(), ...taskDto }],
        });

        return { boards: createdBoard.boards };
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async updateBoard({ user, boardId, taskDto }) {
    try {
      const updatedTask = await this.taskModel.findOneAndUpdate(
        { userId: user.id, 'boards.id': boardId },
        { $set: { 'boards.$': { id: boardId, ...taskDto } } },
        { new: true },
      );

      const result: any = await this.taskModel.findOne({ userId: user.id });
      const boards = result ? result.boards : [];

      return { boards };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteBoard({ user, boardId }) {
    try {
      const updatedBoards = await this.taskModel.findOneAndUpdate(
        { userId: user.id },
        { $pull: { boards: { id: boardId } } },
        { new: true },
      );

      return { boards: updatedBoards.boards };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
