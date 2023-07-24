import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from '../schema/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { paginationParams } from '../utils/pagination';
import { BoardDto } from './dto/update.board.dto';
import { IGetBoardsProps, IAddBoardProps, ILabel } from './interfaces';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getBoards({ user, reqBoard }: IGetBoardsProps) {
    return this.getBoardOfDatabase({ user, reqBoard });
  }

  async addBoard({ user, newBoard, reqBoard }: IAddBoardProps) {
    const board = await this.taskModel.findOne({ userId: user.id });

    const newBoardData = {
      id: uuidv4(),
      created: new Date(),
      updated: new Date(),
      ...newBoard,
    };

    if (!board) {
      await this.taskModel.create({
        userId: user.id,
        boards: [newBoardData],
      });
    } else {
      await this.taskModel.findOneAndUpdate(
        { userId: user.id },
        { $push: { boards: newBoardData } },
      );
    }

    return this.getBoardOfDatabase({ user, reqBoard });
  }

  async updateBoard({ user, boardId, updatedBoard }) {
    const updatedBoardData = {
      id: boardId,
      ...updatedBoard,
      updated: new Date(),
    };

    const updatedAllBoards = await this.taskModel.findOneAndUpdate(
      { userId: user.id, 'boards.id': boardId },
      { $set: { 'boards.$': updatedBoardData } },
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
    const { sort } = reqBoard;

    const userProfile: any = await this.taskModel
      .findOne({ userId: user.id })
      .lean();
    if (!userProfile) throw new Error(`User not found`);

    const boards = [...userProfile.boards];
    switch (sort) {
      case 'latestCreatedFirst':
        boards.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
        break;
      case 'oldestCreatedFirst':
        boards.sort(
          (a: BoardDto, b: BoardDto) =>
            new Date(a.created).getTime() - new Date(b.created).getTime(),
        );
        break;
      case 'latestUpdatedFirst':
        boards.sort(
          (a: BoardDto, b: BoardDto) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime(),
        );
        break;
      case 'oldestUpdatedFirst':
        boards.sort(
          (a: BoardDto, b: BoardDto) =>
            new Date(a.updated).getTime() - new Date(b.updated).getTime(),
        );
        break;
      default:
        boards.sort(
          (a: BoardDto, b: BoardDto) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
    }

    const totalBoards = userProfile.boards.length;
    const filteredResult = await this.getFilteredBoards({ boards, reqBoard });

    return { boards: filteredResult, totalBoards };
  }

  async getFilteredBoards({ boards, reqBoard }) {
    const { query, labels, colors } = reqBoard;
    const { skip, limit } = paginationParams(reqBoard);

    const filteredResult = boards.filter((board: BoardDto) => {
      if (query && !board.title.toLowerCase().includes(query.toLowerCase()))
        return false;

      if (labels && labels.length === 0) return false;
      if (labels) {
        const setOfLabels = new Set(
          board.labels.map((item: any) => item.label),
        );
        const arrayOfSearchLabels = labels.split(',');

        console.log('setOfLabels', setOfLabels);
        console.log('arrayOfSearchLabels', arrayOfSearchLabels);

        for (const searchLabel of arrayOfSearchLabels) {
          if (setOfLabels.has(searchLabel)) return false;
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
    return slicedBoards;
  }
}
