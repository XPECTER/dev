import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  orderItems: OrderItem[];

  @IsOptional()
  @IsString()
  couponId?: string;

  @IsOptional()
  @IsNumber()
  pointAmountToUse?: number;

  @IsOptional()
  @IsString()
  shippingAddress?: string;
}
