import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';

@Module({
  controllers: [AppController, TaskController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    TaskModule,
  ],
})
export class AppModule {}
