import { AccountId } from 'src/domains/entities/account.entity';
import { MoneyEntity } from 'src/domains/entities/money.entity';

export class SendMoneyCommand {
  constructor(
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _money: MoneyEntity,
  ) {}

  public get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  public get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  public get money(): MoneyEntity {
    return this._money;
  }
}
