import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { getUUID } from 'src/common/util/generate-uuid';
import { PointRepository } from '../repositories/point.repository';
import { IssuedCouponRepository } from 'src/coupon/repositories/issued-coupon.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly pointRepo: PointRepository,
    private readonly issuedCouponRepo: IssuedCouponRepository,
  ) {}

  createHeaders() {
    const secretKey = this.configService.get<string>('TOSS_PAYMENT_SECRET_KEY');
    return {
      Authorization: 'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
      'Content-Type': 'application/json',
    };
  }

  async requestPayment() {
    const url = 'https://api.tosspayments.com/v1/payments/confirm';
    const headers = this.createHeaders();
    const body = {
      paymentKey: getUUID(),
      orderId: getUUID(),
      amount: '15000',
    };
    const { data } = await firstValueFrom(
      this.httpService.post(url, body, { headers }).pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw 'An error happened';
        }),
      ),
    );
    console.log(data);
    return data;
    return;
  }

  async getPaymentInformation(userId: string) {
    // 포인트 정보
    const point = await this.pointRepo.findOne({
      select: ['id', 'amount'],
      where: { user: { id: userId } },
    });

    const coupons = await this.issuedCouponRepo.find({
      where: { user: { id: userId } },
    });

    // 쿠폰 정보
    return { point: point.amount, coupons };
  }
}
