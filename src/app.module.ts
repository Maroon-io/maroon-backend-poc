import { Module } from '@nestjs/common';
import { OrderModule } from './modules/orderBook/order.module';

@Module({
  imports: [OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
