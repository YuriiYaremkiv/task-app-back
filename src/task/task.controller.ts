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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('board')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  getBoards(@Request() req: any) {
    const user = req.user;
    return this.taskService.getBoards(user);
  }

  @UseGuards(AuthGuard)
  @Post()
  addBoard(@Request() req: any, @Body() taskDto: CreateTaskDto) {
    const user = req.user;
    return this.taskService.addBoard({ user, taskDto });
  }

  @UseGuards(AuthGuard)
  @Patch(':boardId')
  updateBoard(
    @Request() req: any,
    @Param('boardId') boardId: string,
    @Body() taskDto: CreateTaskDto,
  ) {
    const user = req.user;
    return this.taskService.updateBoard({ user, boardId, taskDto });
  }

  @UseGuards(AuthGuard)
  @Delete(':boardId')
  deleteBoard(@Request() req: any, @Param('boardId') boardId: string) {
    const user = req.user;
    return this.taskService.deleteBoard({ user, boardId });
  }
}
