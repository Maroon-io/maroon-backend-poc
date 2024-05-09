import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum OrderType {
  SELL = 'sell',
  BUY = 'buy',
}

export class CreateOrderDto {
  @ApiProperty({ enum: OrderType, enumName: 'OrderType' })
  @IsNotEmpty()
  orderType: OrderType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  metadata: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
