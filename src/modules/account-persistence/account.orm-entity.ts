import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'accounts' })
export class AccountOrmEntity {
  _id: string;

  @Prop()
  userId: string;
}

export const AccountOrmSchema = SchemaFactory.createForClass(AccountOrmEntity);
