/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsIn } from 'class-validator';

export class UpdateBillStatusDto {
    @IsIn(['paid', 'unpaid'])
    status: 'paid' | 'unpaid';
}
/* eslint-enable @typescript-eslint/no-unsafe-call */
