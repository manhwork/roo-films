import { TourCategory } from '../../models/TourCategory';
import { http } from '../../utils/http';

export type CreateTour = {
    title: string;
    price: number;
    discount?: number;
    stock: number;
    status: string;
    position?: number;
    images?: string[];
    duration_days: number;
    transportation: string;
    information: string;
    schedule: string;
    code?: string;
    category_id?: string | TourCategory;
    is_featured?: boolean;
};

export const createTour = async (params?: CreateTour) => {
    const response = await http.post('/tours/create', params);

    return {
        code: 201,
        data: response.data
    };
};
