import { AccountId } from 'src/domains/entities/account.entity';

export const GetAccountBalanceQuerySymbol = Symbol('GetAccountBalanceQuery');

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId);
}
