import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  GetAccountBalanceQuery,
  GetAccountBalanceQuerySymbol,
} from 'src/domains/ports/in/get-account-balance.query';

@Controller('/account/balance')
export class GetAccountBalanceController {
  constructor(
    @Inject(GetAccountBalanceQuerySymbol)
    private readonly _getAccountBalanceQuery: GetAccountBalanceQuery,
  ) {}

  @Get('/')
  async getBalance(@Query('accountId') accountId: string) {
    const result = await this._getAccountBalanceQuery.getAccountBalance(
      accountId,
    );
    return { result };
  }
}
