import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get('/order-book-history')
  async getOrderHistory() {
    return await this.orderService.getOrderHistory();
  }

  @Get('/user-order-history/:userId')
  async getUserOrders(@Param('userId') userId: string) {
    return await this.orderService.getUserOrders(userId);
  }
}
