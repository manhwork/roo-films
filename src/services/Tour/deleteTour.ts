import { Tour } from '../../models/Tour';
import { http } from '../../utils/http';

export interface DeleteTour {
    id: Tour['_id'];
}

export const deleteTour = async (params?: DeleteTour) => {
    const response = await http.delete(`/tours/deleteOne/${params?.id}`);

    return {
        code: 200,
        data: response
    };
};
