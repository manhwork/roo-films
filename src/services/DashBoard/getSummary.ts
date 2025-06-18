import { Summary } from '../../models/Summary';
import { http } from '../../utils/http';
import { ResponseDetailSuccess } from '../../utils/types/ServiceResponse';

export const getSummary = async (params?: any): Promise<ResponseDetailSuccess<Summary>> => {
    const response = await http.get('dashboard/summary', { params });
    const res = response.data;

    return {
        code: 200,
        data: res.data
    };
};
