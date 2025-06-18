import { number, object, string, z } from 'zod';

// Định nghĩa schema validation với zod
export const getMutationTourCategory = object({
    title: string(),

    image: string().optional(),

    description: string(),

    status: string(),

    position: number()
});

export type TourCategorySchema = z.infer<typeof getMutationTourCategory>;
