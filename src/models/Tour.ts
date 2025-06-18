import { ModelBase } from './ModeBase';
import { TourCategory } from './TourCategory';

export interface Tour extends ModelBase {
    title: string;
    code: string;
    price: number;
    discount: number;
    stock: number;
    status: string;
    position: number;
    images: string[];
    duration_days: number;
    transportation: string;
    information: string;
    schedule: string;
    slug: string;
    deleted: boolean;
    deleted_at: string;
    category_id?: string | TourCategory;
    is_featured: boolean;
}
