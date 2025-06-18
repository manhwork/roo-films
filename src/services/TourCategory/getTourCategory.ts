import { TourCategory } from '../../models/TourCategory';
import { http } from '../../utils/http';
import { ResponseDetailSuccess } from '../../utils/types/ServiceResponse';

export interface GetTourCategory {
    id: TourCategory['_id'];
}

export type TourCategoryResponseData = TourCategory;

export const getTourCategory = async (
    params?: GetTourCategory
): Promise<ResponseDetailSuccess<TourCategoryResponseData>> => {
    const response = await http.get(`/tour-categories/detail/${params?.id}`);
    const res = response.data;

    console.log(res);
    return {
        code: 200,
        data: res.data
    };
};
