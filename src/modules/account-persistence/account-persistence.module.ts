import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SendMoneyUseCaseSymbol } from 'src/domains/ports/in/send-money.use-case';
import { SendMoneyService } from 'src/domains/services/send-money.service';
import {
  AccountOrmEntity,
  AccountOrmSchema,
} from './entities/account.orm-entity';
import {
  ActivityOrmEntity,
  ActivityOrmSchema,
} from './entities/activity.orm-entity';
import { LoadAccountAdapter } from './adapters/load-account.adapter';
import { UpdateAccountActivitiesAdapter } from './adapters/update-account-activities.adapter';
import { GetAccountBalanceQuerySymbol } from 'src/domains/ports/in/get-account-balance.query';
import { GetAccountBalanceService } from 'src/domains/services/get-account-balance.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AccountOrmEntity.name, schema: AccountOrmSchema },
      { name: ActivityOrmEntity.name, schema: ActivityOrmSchema },
    ]),
  ],
  providers: [
    LoadAccountAdapter,
    UpdateAccountActivitiesAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (loadAccountAdapter, updateAccountActivitiesAdapter) => {
        return new SendMoneyService(
          loadAccountAdapter,
          updateAccountActivitiesAdapter,
        );
      },
      inject: [LoadAccountAdapter, UpdateAccountActivitiesAdapter],
    },
    {
      provide: GetAccountBalanceQuerySymbol,
      useFactory: (loadAccountAdapter) => {
        return new GetAccountBalanceService(loadAccountAdapter);
      },
      inject: [LoadAccountAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol, GetAccountBalanceQuerySymbol],
})
export class AccountPersistenceModule {}
