import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SendMoneyUseCaseSymbol } from 'src/domains/ports/in/send-money.use-case';
import { SendMoneyService } from 'src/domains/services/send-money.service';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountOrmEntity, AccountOrmSchema } from './account.orm-entity';
import { ActivityOrmEntity, ActivityOrmSchema } from './activity.orm-entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountOrmEntity.name, schema: AccountOrmSchema },
      { name: ActivityOrmEntity.name, schema: ActivityOrmSchema },
    ]),
  ],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (accountPersistenceAdapter) => {
        return new SendMoneyService(
          accountPersistenceAdapter,
          accountPersistenceAdapter,
        );
      },
      inject: [AccountPersistenceAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol],
})
export class AccountPersistenceModule {}
