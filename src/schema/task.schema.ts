import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  boards: [
    {
      id: string;
      title: string;
      color: string;
      created: Date;
      updated: Date;
      labels: [{ text: string; color: string }];
      cards: [
        {
          id: string;
          title: string;
          desc: string;
          date: string;
          tasks: [
            {
              id: string;
              completed: boolean;
              text: string;
            },
          ];
          labels: [
            {
              color: string;
              text: string;
            },
          ];
        },
      ];
    },
  ];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
