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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AccessTokenGuard } from 'common/guards/accessToken.guard';

@Controller('board')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  getBoards(@Request() req: any, @Query() queryParam: any) {
    const user = req.user;
    return this.taskService.getBoards({ user, queryParam });
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  addBoard(@Request() req: any, @Body() taskDto: CreateTaskDto) {
    const user = req.user;
    return this.taskService.addBoard({ user, taskDto });
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':boardId')
  updateBoard(
    @Request() req: any,
    @Param('boardId') boardId: string,
    @Body() taskDto: CreateTaskDto,
  ) {
    const user = req.user;
    return this.taskService.updateBoard({ user, boardId, taskDto });
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':boardId')
  deleteBoard(@Request() req: any, @Param('boardId') boardId: string) {
    const user = req.user;
    return this.taskService.deleteBoard({ user, boardId });
  }
}
