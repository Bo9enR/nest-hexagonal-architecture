import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountEntity, AccountId } from 'src/domains/entities/account.entity';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';
import { ActivityOrmEntity } from './../entities/activity.orm-entity';
import { AccountMapper } from './../account.mapper';
import { AccountOrmEntity } from './../entities/account.orm-entity';

@Injectable()
export class LoadAccountAdapter implements LoadAccountPort {
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
}
