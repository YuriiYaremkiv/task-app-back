import { RequestTaskDto } from '../dto/req.task.dto';
import { IUser } from '../../interfaces';
import { CreateBoardDto } from '../dto/create.board.dto';

export interface IGetBoardsProps {
  user: IUser;
  reqBoard: RequestTaskDto;
}

export interface IAddBoardProps {
  user: IUser;
  newBoard: CreateBoardDto;
  reqBoard: RequestTaskDto;
}

export interface ILabel {
  label: string;
  color: string;
}
