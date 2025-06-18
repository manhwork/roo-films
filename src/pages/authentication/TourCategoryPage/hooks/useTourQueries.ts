import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateTourCategory, createTourCategory } from '../../../../services/TourCategory/createTourCategory';
import { GetTourCategories, getTourCategories } from '../../../../services/TourCategory/getTourCategories';
import { getTourCategory, GetTourCategory } from '../../../../services/TourCategory/getTourCategory';
import { UpdateTourCategory, updateTourCategory } from '../../../../services/TourCategory/updateTourCategory';
import { deleteTourCategory, DeleteTourCategory } from '../../../../services/TourCategory/deleteTourCategory';

export const TOUR_CATEGORY_QUERY_KEYS = {
    all: ['tour-categories'] as const,
    list: (params?: GetTourCategories) => [...TOUR_CATEGORY_QUERY_KEYS.all, 'list', params] as const
};

export const useTourCategories = (params?: GetTourCategories) => {
    const query = useQuery({
        queryKey: TOUR_CATEGORY_QUERY_KEYS.list(params),
        queryFn: () => getTourCategories(params)
    });

    if (query.isError) {
        console.error('Get tour categories error:', query.error);
    }

    return query;
};

export const useTourCategory = (params: GetTourCategory) => {
    const query = useQuery({
        queryKey: ['tour-category', params.id],
        queryFn: () => getTourCategory(params),
        enabled: !!params.id
    });

    if (query.isError) {
        console.error('Get tour category error:', query.error);
    }

    return query;
};

export const useCreateTourCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreateTourCategory) => createTourCategory(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TOUR_CATEGORY_QUERY_KEYS.all });
        },
        onError: (error) => {
            console.error('Create tour category error:', error);
        }
    });
};

export const useUpdateTourCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateTourCategory) => updateTourCategory(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TOUR_CATEGORY_QUERY_KEYS.all });
        },
        onError: (error) => {
            console.error('Update tour category error:', error);
        }
    });
};

export const useDeleteTourCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: DeleteTourCategory) => deleteTourCategory(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TOUR_CATEGORY_QUERY_KEYS.all });
        },
        onError: (error) => {
            console.error('Delete tour category error:', error);
        }
    });
};
