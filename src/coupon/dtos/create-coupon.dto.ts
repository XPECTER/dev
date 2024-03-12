import {
  IsIn,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  name: string;

  @IsString()
  @IsIn(['percent', 'fixed'])
  type: string;

  @IsNumber()
  @Min(1)
  @ValidateIf((o) => o.type === 'percent')
  @Max(100)
  value: number;
}
