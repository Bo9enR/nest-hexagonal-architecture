import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountEntity } from 'src/domains/entities/account.entity';
import { UpdateAccountStatePort } from 'src/domains/ports/out/update-account-state.port';
import { AccountMapper } from './../account.mapper';
import { ActivityOrmEntity } from './../entities/activity.orm-entity';

@Injectable()
export class UpdateAccountActivitiesAdapter implements UpdateAccountStatePort {
  constructor(
    @InjectModel(ActivityOrmEntity.name)
    private readonly _activityModel: Model<ActivityOrmEntity>,
  ) {}

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
