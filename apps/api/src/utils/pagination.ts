export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

/**
 * Sayfalama sonucunu standart formata çevirir
 */
export function paginate<T>({
    data,
    total,
    page,
    pageSize,
}: {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}): PaginatedResult<T> {
    return {
        data,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };
}
