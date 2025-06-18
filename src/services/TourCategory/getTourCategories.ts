import { TourCategory } from '../../models/TourCategory';
import { http } from '../../utils/http';
import {
    FilterParams,
    PaginateParams,
    ResponseListSuccess,
    SearchParams,
    SortParams
} from '../../utils/types/ServiceResponse';

export interface GetTourCategories {
    pagination?: PaginateParams;
    searcher?: SearchParams;
    sort?: SortParams;
    filter?: FilterParams;
}

export type TourCategoriesResponseData = TourCategory;

export const getTourCategories = async (
    params?: GetTourCategories
): Promise<ResponseListSuccess<TourCategoriesResponseData>> => {
    const response = await http.get('/tour-categories', {
        params: {
            sortBy: params?.sort?.sortBy,
            sortType: params?.sort?.sortType,
            keyword: params?.searcher?.keyword,
            field: params?.searcher?.field,
            offset: params?.pagination?.page
                ? ((params?.pagination?.page ?? 1) - 1) * (params?.pagination?.pageSize ?? 10)
                : undefined,
            limit: params?.pagination?.pageSize ? params?.pagination?.pageSize : 10,
            status: params?.filter?.value
        }
    });

    console.log(response);

    const res = response.data;

    return {
        code: res.code,
        data: {
            hits: res.data.hits,
            pagination: {
                totalPages: res.data.pagination.totalPages,
                totalRows: res.data.pagination.totalRows
            }
        }
    };
};
