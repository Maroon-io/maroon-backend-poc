import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderBook } from 'hft-limit-order-book';
import { Order } from 'hft-limit-order-book/dist/types/order';
import { PrismaService } from 'src/services/prisma.service';

export interface IProcessOrder {
  done: Order[];
  partial: Order | null;
  partialQuantityProcessed: number;
  quantityLeft: number;
  err: Error | null;
}

@Injectable()
export class OrderService {
  private readonly orderBook: OrderBook = new OrderBook();

  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    await this.prismaService.orderBook.create({
      data: {
        orderId: createOrderDto.orderId,
        metadata: createOrderDto.metadata,
        side: createOrderDto.orderType,
        size: createOrderDto.size,
        price: createOrderDto.price,
        userId: createOrderDto.userId,
      },
    });

    return this.orderBook.limit(
      createOrderDto.orderType as any,
      createOrderDto.orderId,
      createOrderDto.size,
      createOrderDto.price,
    ) as any;
  }

  async getOrderHistory() {
    const allOrders = await this.prismaService.orderBook.findMany();
    const openOrders = this.getMatchEngineOrder();

    const stores = [];

    for (const allOrder of allOrders) {
      let orderStatus = 'Filled';
      for (let i = 0; i < openOrders.length; i++) {
        const openOrder = openOrders[i];
        if (allOrder.orderId === openOrder.id) {
          orderStatus = 'Pending';
        }
      }
      stores.push({ ...allOrder, orderStatus });
    }

    return stores;
  }

  async getUserOrders(userId: string) {
    const orderHistories = await this.getOrderHistory();

    return orderHistories.filter((order) => order.userId === userId);
  }

  getMatchEngineOrder() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const orders = this.orderBook.orders;
    const allOrders = Object.values(orders).map((order: any) => ({
      id: order._id,
      side: order._side,
      price: order._price,
      size: order._size,
      time: order._time,
      isMaker: order._isMaker,
    }));
    return allOrders;
  }
}
