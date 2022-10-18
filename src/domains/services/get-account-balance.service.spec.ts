import { instance, mock, when } from 'ts-mockito';
import { AccountEntity, AccountId } from '../entities/account.entity';
import { ActivityWindowEntity } from '../entities/activity-window.entity';
import { ActivityEntity } from '../entities/activity.entity';
import { MoneyEntity } from '../entities/money.entity';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { GetAccountBalanceService } from './get-account-balance.service';

describe('GetAccountBalanceService', () => {
  it('should result success', async () => {
    const loadAccountPort = mock<LoadAccountPort>();

    function givenAnAccountWithId(id: AccountId): AccountEntity {
      const activity = new ActivityEntity(
        '42',
        '0',
        '42',
        new Date(),
        MoneyEntity.of(20),
      );

      const activityWindow = new ActivityWindowEntity();
      activityWindow.addActivity(activity);

      const account = new AccountEntity(
        id,
        MoneyEntity.of(100),
        activityWindow,
      );
      when(loadAccountPort.loadAccount(id)).thenResolve(account);
      return account;
    }

    const account = givenAnAccountWithId('42');

    const getAccountBalanceService = new GetAccountBalanceService(
      instance(loadAccountPort),
    );

    const result = await getAccountBalanceService.getAccountBalance(account.id);
    expect(result.amount.toNumber()).toEqual(120);
  });
});
