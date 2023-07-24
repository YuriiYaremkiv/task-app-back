import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { TaskService } from './task.service';
import { RequestTaskDto } from './dto/req.task.dto';
import { CreateBoardDto } from './dto/create.board.dto';
import { CustomRequest } from 'interfaces';

@Controller('board')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  getBoards(@Request() req: CustomRequest, @Query() reqBoard: RequestTaskDto) {
    const user = req.user;
    return this.taskService.getBoards({ user, reqBoard });
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  addBoard(
    @Request() req: CustomRequest,
    @Query() reqBoard: RequestTaskDto,
    @Body() newBoard: CreateBoardDto,
  ) {
    const user = req.user;
    return this.taskService.addBoard({ user, newBoard, reqBoard });
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':boardId')
  updateBoard(
    @Param('boardId') boardId: string,
    @Request() req: CustomRequest,
    @Body() updatedBoard: CreateBoardDto,
  ) {
    const user = req.user;
    return this.taskService.updateBoard({ user, boardId, updatedBoard });
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':boardId')
  deleteBoard(
    @Param('boardId') boardId: string,
    @Request() req: CustomRequest,
    @Query() reqBoard: RequestTaskDto,
  ) {
    const user = req.user;
    return this.taskService.deleteBoard({ user, boardId, reqBoard });
  }
}
