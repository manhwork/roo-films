import { Tour } from '../../models/Tour';
import { http } from '../../utils/http';
import { ResponseDetailSuccess } from '../../utils/types/ServiceResponse';

export interface GetTour {
    id: Tour['_id'];
}

export type TourResponseData = Tour;

export const getTour = async (params?: GetTour): Promise<ResponseDetailSuccess<TourResponseData>> => {
    const response = await http.get(`/tours/detail/${params?.id}`);
    const res = response.data;

    console.log(res);
    return {
        code: 200,
        data: res.data
    };
};
