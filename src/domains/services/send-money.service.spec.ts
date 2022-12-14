import { AccountEntity, AccountId } from '../entities/account.entity';
import { MoneyEntity } from '../entities/money.entity';
import { SendMoneyCommand } from '../ports/in/send-money.command';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { UpdateAccountStatePort } from '../ports/out/update-account-state.port';
import { mock, when, anything, anyString, instance } from 'ts-mockito';
import { SendMoneyService } from './send-money.service';

describe('SendMoneyService', () => {
  it('should transaction success', async () => {
    const loadAccountPort = mock<LoadAccountPort>();
    const updateAccountStatePort = mock<UpdateAccountStatePort>();

    function givenAnAccountWithId(id: AccountId) {
      const mockedAccountEntity = mock(AccountEntity);
      when(mockedAccountEntity.id).thenReturn(id);
      when(mockedAccountEntity.withdraw(anything(), anyString())).thenReturn(
        true,
      );
      when(mockedAccountEntity.deposit(anything(), anyString())).thenReturn(
        true,
      );

      const account = instance(mockedAccountEntity);
      when(loadAccountPort.loadAccount(id)).thenResolve(account);
      return account;
    }

    const sourceAccount = givenAnAccountWithId('41');
    const targetAccount = givenAnAccountWithId('42');

    const command = new SendMoneyCommand(
      sourceAccount.id,
      targetAccount.id,
      MoneyEntity.of(300),
    );

    const sendMoneyService = new SendMoneyService(
      instance(loadAccountPort),
      instance(updateAccountStatePort),
    );
    const result = await sendMoneyService.sendMoney(command);

    expect(result).toBeTruthy();
  });
});
