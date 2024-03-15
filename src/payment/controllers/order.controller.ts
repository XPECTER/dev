import { Controller, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';

@Controller('/api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder() {
    return this.orderService.createOrder();
  }
}
