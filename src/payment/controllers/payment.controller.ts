import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenPayload } from 'src/auth/types';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async requestPayment() {
    try {
      const response = await this.paymentService.requestPayment();
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 가지고 있는 쿠폰, 포인트, 카드정보 등
  @UseGuards(AuthGuard('access'))
  @Get()
  getPaymentInformation(@Req() req: Request) {
    const payload = req.user as TokenPayload;
    return this.paymentService.getPaymentInformation(payload.sub);
  }
}
