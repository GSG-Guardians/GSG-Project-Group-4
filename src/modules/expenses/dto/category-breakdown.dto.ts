export class CategoryBreakdownItemDto {
    category: string;
    totalAmount: number;
    percentage: number;
}

export class CategoryBreakdownDto {
    categories: CategoryBreakdownItemDto[];
}
