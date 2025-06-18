import { TourCategory } from '../../models/TourCategory';
import { http } from '../../utils/http';
import { CreateTourCategory } from './createTourCategory';

export type UpdateTourCategory = CreateTourCategory & {
    id?: TourCategory['_id'];
};

export const updateTourCategory = async (params?: UpdateTourCategory) => {
    const response = await http.patch(`/tour-categories/update/${params?.id}`, params);

    return {
        code: 200,
        data: response.data
    };
};
