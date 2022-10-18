import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'activities' })
export class ActivityOrmEntity {
  _id: string;

  @Prop()
  timestamp: Date;

  @Prop()
  ownerAccountId: string;

  @Prop()
  sourceAccountId: string;

  @Prop()
  targetAccountId: string;

  @Prop()
  amount: number;
}

export const ActivityOrmSchema =
  SchemaFactory.createForClass(ActivityOrmEntity);
