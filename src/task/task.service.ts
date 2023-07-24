import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from '../schema/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { paginationParams } from '../utils/pagination';
import { IGetBoardsProps, IAddBoardProps } from './interfaces';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getBoards({ user, reqBoard }: IGetBoardsProps) {
    return this.getBoardOfDatabase({ user, reqBoard });
  }

  async addBoard({ user, newBoard, reqBoard }: IAddBoardProps) {
    const board = await this.taskModel.findOne({ userId: user.id });

    console.log('tilte', typeof newBoard.title);
    console.log('color', typeof newBoard.color);
    console.log('labels', Object.prototype.toString.call(newBoard.labels));
    console.log('cards', Object.prototype.toString.call(newBoard.cards));

    if (!board) {
      await this.taskModel.create({
        userId: user.id,
        boards: [{ id: uuidv4(), ...newBoard }],
      });
    } else {
      await this.taskModel.findOneAndUpdate(
        { userId: user.id },
        { $push: { boards: { id: uuidv4(), ...newBoard } } },
      );
    }

    return this.getBoardOfDatabase({ user, reqBoard });
  }

  async updateBoard({ user, boardId, updatedBoard }) {
    const updatedAllBoards = await this.taskModel.findOneAndUpdate(
      { userId: user.id, 'boards.id': boardId },
      { $set: { 'boards.$': { id: boardId, ...updatedBoard } } },
      { new: true },
    );

    const board =
      updatedAllBoards?.boards.find((board) => board.id === boardId) ?? null;

    return board;
  }

  async deleteBoard({ user, boardId, reqBoard }) {
    await this.taskModel.findOneAndUpdate(
      { userId: user.id },
      { $pull: { boards: { id: boardId } } },
      { new: true },
    );

    return this.getBoardOfDatabase({ user, reqBoard });
  }

  async getBoardOfDatabase({ user, reqBoard }: IGetBoardsProps) {
    const { query, labels, colors } = reqBoard;
    const { skip, limit } = paginationParams(reqBoard);

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
}
