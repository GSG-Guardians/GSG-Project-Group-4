export class DonutSegmentDto {
    category: string;
    amount: number;
    percentage: number;
    color?: string;
}

export class DonutChartDto {
    segments: DonutSegmentDto[];
    total: number;
}
