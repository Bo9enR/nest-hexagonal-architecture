import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountEntity, AccountId } from 'src/domains/entities/account.entity';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';
import { UpdateAccountStatePort } from 'src/domains/ports/out/update-account-state.port';
import { AccountMapper } from './account.mapper';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';

@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort
{
  constructor(
    @InjectModel(AccountOrmEntity.name)
    private readonly _accountModel: Model<AccountOrmEntity>,
    @InjectModel(ActivityOrmEntity.name)
    private readonly _activityModel: Model<ActivityOrmEntity>,
  ) {}

  async loadAccount(accountId: AccountId): Promise<AccountEntity> {
    const account = await this._accountModel.findOne({ userId: accountId });
    if (!account) {
      throw new Error('Account not found');
    }

    const activities = await this._activityModel.find({
      ownerAccountId: accountId,
    });

    return AccountMapper.mapToDomain(account, activities);
  }

  async updateActivities(account: AccountEntity): Promise<void> {
    account.activityWindow.activities.forEach((activity) => {
      if (!activity.id) {
        this._activityModel.create(
          AccountMapper.mapToActivityOrmEntity(activity),
        );
      } else {
        this._activityModel.findOneAndUpdate(
          { _id: activity.id },
          AccountMapper.mapToActivityOrmEntity(activity),
        );
      }
    });
  }
}
