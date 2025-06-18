import { http } from '../../utils/http';

export type CreateTourCategory = {
    title: string;
    image?: string;
    description: string;
    status: string;
    position?: number;
};

export const createTourCategory = async (params?: CreateTourCategory) => {
    const response = await http.post('/tour-categories/create', params);

    return {
        code: 201,
        data: response.data
    };
};
