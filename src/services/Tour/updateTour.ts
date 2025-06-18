import { Tour } from '../../models/Tour';
import { http } from '../../utils/http';
import { CreateTour } from './createTour';

export type UpdateTour = CreateTour & {
    id?: Tour['_id'];
};

export const updateTour = async (params?: UpdateTour) => {
    const response = await http.patch(`/tours/update/${params?.id}`, params);

    return {
        code: 200,
        data: response.data
    };
};
