import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderBook } from 'hft-limit-order-book';
import { Order } from 'hft-limit-order-book/dist/types/order';

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

  createOrder(createOrderDto: CreateOrderDto): IProcessOrder {
    return this.orderBook.limit(
      createOrderDto.orderType as any,
      createOrderDto.orderId,
      createOrderDto.size,
      createOrderDto.price,
    );
  }

  getOrder() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const orders = this.orderBook.orders;
    console.log({ orders });
    const allOrders = Object.values(orders).map((order: any) => ({
      id: order._id,
      side: order._side,
      price: order._price,
      size: order._size,
      time: order._time,
      isMaker: order._isMaker,
    }));
    console.log({ allOrders });

    return allOrders;
  }
}
