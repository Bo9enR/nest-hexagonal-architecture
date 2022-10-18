import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountPersistenceModule } from './modules/account-persistence/account-persistence.module';
import { AccountWebModule } from './modules/account-web/account-web.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-hexagonal'),
    AccountPersistenceModule,
    AccountWebModule,
  ],
})
export class AppModule {}
