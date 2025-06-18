import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { CreateTour, createTour } from '../../../../services/Tour/createTour';
import { deleteTour, DeleteTour } from '../../../../services/Tour/deleteTour';
import { GetTour, getTour } from '../../../../services/Tour/getTour';
import { getTours, GetTours } from '../../../../services/Tour/getTours';
import { UpdateTour, updateTour } from '../../../../services/Tour/updateTour';

export const TOUR_QUERY_KEYS = {
    all: ['tours'] as const,
    list: (params?: GetTours) => [...TOUR_QUERY_KEYS.all, 'list', params] as const
};

export const useTours = (params?: GetTours) => {
    const query = useQuery({
        queryKey: TOUR_QUERY_KEYS.list(params),
        queryFn: () => getTours(params)
    });

    if (query.isError) {
        console.error('Get tours error:', query.error);
        notification.error({
            message: 'Lỗi tải dữ liệu',
            description: 'Không thể tải danh sách tour. Vui lòng thử lại sau.'
        });
    }

    return query;
};

export const useTour = (params: GetTour) => {
    const query = useQuery({
        queryKey: ['tour', params.id],
        queryFn: () => getTour(params),
        enabled: !!params.id
    });

    if (query.isError) {
        console.error('Get tour error:', query.error);
        notification.error({
            message: 'Lỗi tải dữ liệu',
            description: 'Không thể tải thông tin tour. Vui lòng thử lại sau.'
        });
    }

    return query;
};

export const useCreateTour = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreateTour) => createTour(params),
        onSuccess: () => {
            console.log('create tour success');
            queryClient.clear();
            notification.success({
                message: 'Tạo tour thành công',
                description: 'Tour đã được tạo thành công'
            });
        },
        onError: (error: any) => {
            console.error('Create tour error:', error);
            notification.error({
                message: 'Tạo tour thất bại',
                description: error.message || 'Đã có lỗi xảy ra khi tạo tour'
            });
        }
    });
};

export const useUpdateTour = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateTour) => updateTour(params),
        onSuccess: () => {
            console.log('update tour success');
            queryClient.clear();
            notification.success({
                message: 'Cập nhật tour thành công',
                description: 'Tour đã được cập nhật thành công'
            });
        },
        onError: (error: any) => {
            console.error('Update tour error:', error);
            notification.error({
                message: 'Cập nhật tour thất bại',
                description: error.message || 'Đã có lỗi xảy ra khi cập nhật tour'
            });
        }
    });
};

export const useDeleteTour = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: DeleteTour) => deleteTour(params),
        onSuccess: () => {
            queryClient.clear();
            notification.success({
                message: 'Xóa tour thành công',
                description: 'Tour đã được xóa thành công'
            });
        },
        onError: (error: any) => {
            console.error('Delete tour error:', error);
            notification.error({
                message: 'Xóa tour thất bại',
                description: error.message || 'Đã có lỗi xảy ra khi xóa tour'
            });
        }
    });
};
