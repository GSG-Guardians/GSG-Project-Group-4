/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateBillDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  date?: string;

  @IsUUID()
  @IsOptional()
  currencyId?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsUUID()
  @IsOptional()
  assetId?: string | null;
}
/* eslint-enable @typescript-eslint/no-unsafe-call */
