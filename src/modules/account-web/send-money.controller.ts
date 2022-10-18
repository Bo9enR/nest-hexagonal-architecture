import { Controller, Get, Inject, Query } from '@nestjs/common';
import { MoneyEntity } from 'src/domains/entities/money.entity';
import { SendMoneyCommand } from 'src/domains/ports/in/send-money.command';
import {
  SendMoneyUseCase,
  SendMoneyUseCaseSymbol,
} from 'src/domains/ports/in/send-money.use-case';

@Controller('/account/send')
export class SendMoneyController {
  constructor(
    @Inject(SendMoneyUseCaseSymbol)
    private readonly _sendMoneyUseCase: SendMoneyUseCase,
  ) {}

  @Get('/')
  async sendMoney(
    @Query('sourceAccountId') sourceAccountId: string,
    @Query('targetAccountId') targetAccountId: string,
    @Query('amount') amount: number,
  ) {
    const command = new SendMoneyCommand(
      sourceAccountId,
      targetAccountId,
      MoneyEntity.of(amount),
    );

    const result = await this._sendMoneyUseCase.sendMoney(command);
    return { result };
  }
}
