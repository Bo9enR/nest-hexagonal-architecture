import { GetAccountBalanceQuery } from 'src/domains/ports/in/get-account-balance.query';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly _loadAccountPort: LoadAccountPort) {}

  async getAccountBalance(accountId: string) {
    const account = await this._loadAccountPort.loadAccount(accountId);
    return account.calculateBalance();
  }
}
