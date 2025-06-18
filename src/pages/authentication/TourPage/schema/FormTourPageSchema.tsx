import { array, coerce, object, string, z } from 'zod';

// Định nghĩa schema validation với zod
export const getMutationTour = object({
    title: coerce.string(),

    price: coerce.number(),

    discount: coerce.number().optional(),

    stock: coerce.number(),

    status: coerce.string(),

    information: coerce.string(),

    schedule: coerce.string(),

    images: array(string()).optional(),

    duration_days: coerce.number(),

    transportation: coerce.string(),

    category_id: coerce.string().optional(),

    code: coerce.string().optional(),

    is_featured: coerce.boolean().optional()
});

export type TourSchema = z.infer<typeof getMutationTour>;
