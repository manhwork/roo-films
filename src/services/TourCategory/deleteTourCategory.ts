import { TourCategory } from '../../models/TourCategory';
import { http } from '../../utils/http';

export interface DeleteTourCategory {
    id: TourCategory['_id'];
}

export const deleteTourCategory = async (params?: DeleteTourCategory) => {
    const response = await http.delete(`/tour-categories/delete/${params?.id}`);

    return {
        code: 200,
        data: response
    };
};
