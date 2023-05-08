import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Get()
  getCards() {
    return this.taskService.getCards();
  }

  @UseGuards(AuthGuard)
  @Post()
  addCart() {
    return this.taskService.addCard();
  }
}
