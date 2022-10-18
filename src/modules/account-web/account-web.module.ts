import { Module } from '@nestjs/common';
import { GetAccountBalanceController } from './get-account-balance.controller';
import { SendMoneyController } from './send-money.controller';

@Module({
  controllers: [SendMoneyController, GetAccountBalanceController],
})
export class AccountWebModule {}
